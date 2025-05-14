import { Outlet, useLocation } from "react-router-dom";
import { createContext, useEffect, useRef, useState } from "react";
import Header from "../components/1_header";
import NavMenu from "../components/2_NavMenu";
import Footer from "../components/3_Footer";
import MobileHeader from "../components/1_MobileHeader";
import MobileNavMenu from "../components/2_MobileNavMenu";
import StopBanner from "../components/4_StopBanner";
import Loading from "./other/Loading";

export const ScaleContext = createContext();

const Navigation = ({ isMobileNav, mobileScale, scrollContainerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop =
      scrollContainerRef.current?.scrollTop ?? window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  // PC: window 기준, 모바일 or 내부 스크롤 컨테이너 둘 다 감지
  window.addEventListener("scroll", handleScroll);
  scrollContainerRef.current?.addEventListener("scroll", handleScroll);

  handleScroll(); // 초기 감지

  return () => {
    window.removeEventListener("scroll", handleScroll);
    scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
  };
}, [scrollContainerRef]);


  const navHeight = isMobileNav ? 65 : 50;
  const headerHeight = isMobileNav ? 52 : 80.56;

  return (
    <div className="fixed top-0 left-0 w-full" style={{ zIndex: 50 }}>
      {isMobileNav ? (
        <>
          {!isScrolled && (
            <MobileHeader
              mobileScale={mobileScale}
              className="header-container"
              style={{ width: "100vw" }}
            />
          )}
          <MobileNavMenu
            mobileScale={mobileScale}
            style={{
              width: "100vw",
              position: "fixed",
              top: isScrolled ? "0" : `${headerHeight}px`,
              height: `${navHeight}px`,
            }}
            isScrolled={isScrolled}
          />
        </>
      ) : (
        <>
          {!isScrolled && (
            <Header
              className="header-container"
              style={{
                transition: "opacity 0.3s ease",
                opacity: isScrolled ? 0 : 1,
                width: "100vw",
              }}
            />
          )}
          <NavMenu
            isScrolled={isScrolled}
            style={{
              width: "100vw",
            }}
          />
        </>
      )}
    </div>
  );
};

const Layout = () => {
  const [scale, setScale] = useState(1);
  const [mobileScale, setMobileScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentHeight, setContentHeight] = useState(null);
  const { pathname } = useLocation();
  const scrollContainerRef = useRef();
  const contentRef = useRef();
  const outletRef = useRef();
  const footerRef = useRef();

  const navHeight = isMobileNav ? 65 : 50;
  const headerHeight = isMobileNav ? 52 : 80.56;
  const totalPadding = isMobileNav ? headerHeight + navHeight + 0 : 122;
  const extraPadding =
    !isMobileNav && window.innerWidth > 819 && window.innerWidth <= 1920
      ? 20
      : 0;

  useEffect(() => {
    if (window.__isModalOpen) return;
    if (pathname.includes("surveyform")) return;
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 819) {
        setIsMobileNav(true);
        setMobileScale(screenWidth / 393);
      } else {
        setIsMobileNav(false);
        setMobileScale(1);
      }
      if (screenWidth <= 1200) {
        setIsMobile(true);
        setScale(screenWidth / 1200);
      } else {
        setIsMobile(false);
        setScale(0.85); // 1920px 이상에서 콘텐츠 scale 고정
      }
      
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  useEffect(() => {
    const updateContentHeight = () => {
      let totalHeight = 0;
      if (outletRef.current)
        totalHeight += outletRef.current.getBoundingClientRect().height;
      if (footerRef.current)
        totalHeight += footerRef.current.getBoundingClientRect().height;
      setContentHeight(totalHeight + 100);
    };
    const resizeObserver = new ResizeObserver(updateContentHeight);
    if (outletRef.current) resizeObserver.observe(outletRef.current);
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    setTimeout(updateContentHeight, 50);
    return () => {
      if (outletRef.current) resizeObserver.unobserve(outletRef.current);
      if (footerRef.current) resizeObserver.unobserve(footerRef.current);
    };
  }, [isMobile, scale, pathname]);

  const OutletWrapper = () => (
    <div ref={outletRef}>
      <Outlet />
      {/* 푸터를 1920px 이하에서 OutletWrapper 내부로 복구 */}
      {window.innerWidth <= 1920 && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
    </div>
  );

  const scrollbarHideStyle = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <ScaleContext.Provider value={scale}>
      <div className="min-h-screen flex flex-col overflow-hidden">
        {/* 로딩 중일 때는 Navigation 렌더링하지 않음 */}
        {!isLoading && (
          <Navigation
            isMobileNav={isMobileNav}
            mobileScale={mobileScale}
            scrollContainerRef={scrollContainerRef}
          />
        )}

        <div
          ref={scrollContainerRef}
          className="flex-1 flex justify-center items-start overflow-x-hidden overflow-y-auto bg-white"
          style={{
            minHeight: "100vh",
            height: "100vh",
            ...scrollbarHideStyle,
            paddingTop: isLoading ? 0 : `${totalPadding + extraPadding}px`,
            overflowY: "auto",
          }}
        >
          <div
            ref={contentRef}
            className="flex justify-center w-full"
            style={{
  height: contentHeight ? `${contentHeight * scale}px` : "auto",
  minHeight: "100vh",
}}
          >
            <div
              className="flex flex-col w-full"
              style={{
                width: "1920px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                minHeight: isMobile ? "100%" : "auto",
              }}
            >
              <div>{isMobile && isLoading ? <Loading /> : <OutletWrapper />}</div>
            </div>
          </div>
        </div>

        {/* 푸터: 1920px 초과에서 배경색 확장 */}
        {!isLoading && window.innerWidth > 1920 && (
          <div
            style={{
              width: "100vw",
              backgroundColor: "#3D3D3D",
              marginLeft: "calc(-50vw + 50%)",
              zIndex: 50,
              overflowX: "hidden",
            }}
          >
            <div
              ref={footerRef}
              style={{
                maxWidth: "1920px",
                margin: "0 auto",
              }}
            >
              <Footer />
            </div>
          </div>
        )}

        {/* 로딩 중일 때는 StopBanner 렌더링하지 않음 */}
        {!isLoading && <StopBanner style={{ zIndex: 60 }} />}

        <style jsx>{`
          div {
            scroll-behavior: auto;
          }
          div::-webkit-scrollbar {
            display: none;
          }
          .header-container {
            transition: height 0.3s ease, opacity 0.3s ease;
          }
        `}</style>
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1,
        }}
        onWheel={(e) => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop += e.deltaY;
          }
        }}
      />
    </ScaleContext.Provider>
  );
};

export default Layout;