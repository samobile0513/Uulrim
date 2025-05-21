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
    let timeoutId = null;
    
    const handleScroll = () => {
      if (timeoutId) {
        return;
      }
      
      timeoutId = setTimeout(() => {
        const scrollTop = 
          scrollContainerRef.current?.scrollTop ?? window.scrollY;
        setIsScrolled(scrollTop > 0);
        timeoutId = null;
      }, 16);
    };

    const scrollElement = isMobileNav && scrollContainerRef.current 
      ? scrollContainerRef.current 
      : window;
    
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerRef, isMobileNav]);

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
  const [contentHeight, setContentHeight] = useState("100vh");
  const { pathname } = useLocation();
  const scrollContainerRef = useRef();
  const contentRef = useRef();
  const outletRef = useRef();
  const footerRef = useRef();

  const navHeight = isMobileNav ? 65 : 50;
  const headerHeight = isMobileNav ? 52 : 80.56;
  const totalPadding = isMobileNav ? headerHeight + navHeight : 122;
  const extraPadding =
    !isMobileNav && window.innerWidth > 819 && window.innerWidth <= 1920
      ? 20
      : 0;

  useEffect(() => {
    if (window.__isModalOpen) return;
    if (pathname.includes("surveyform")) return;
    
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollContainerRef.current.scrollTop = 0;
      });
    }
  }, [pathname]);

  useEffect(() => {
    let resizeTimeout = null;
    
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = setTimeout(() => {
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
          setScale(0.85);
        }
      }, 100);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem("hasLoadedBefore");
    if (isMobile && !hasLoadedBefore) {
      setIsLoading(true);
      localStorage.setItem("hasLoadedBefore", "true");
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // 페이지별 contentHeight 보정값 설정
    const pageAdjustments = {
      "/": 0.125,      // HomePage
      "/2page": 0.236, // 2page
      "/3page": 0.242, // 3page
      "/4page": 0.265, // 4page
      "/5page": 0.265, // 4page
    };

    const updateContentHeight = () => {
      requestAnimationFrame(() => {
        if (!outletRef.current) return;
        
        let totalHeight = 0;
        totalHeight += outletRef.current.getBoundingClientRect().height;
        
        if (footerRef.current) {
          totalHeight += footerRef.current.getBoundingClientRect().height;
        }
        
        const screenWidth = window.innerWidth;
        let extraSpace = 50;
        
        if (screenWidth > 2560) {
          extraSpace = 10;
        } else if (screenWidth > 1920) {
          extraSpace = 20;
        }
        
        if (totalHeight < window.innerHeight) {
          setContentHeight("100vh");
        } else {
          // 페이지별 보정값 적용
          const adjustment = pageAdjustments[pathname] || 1; // 기본값 1 (기타 페이지)
          if (adjustment !== 1) {
            totalHeight *= adjustment;
          } else {
            totalHeight += 100; // 기타 페이지의 원본 로직
          }
          setContentHeight(totalHeight + extraSpace);
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (window.updateHeightTimeout) {
        clearTimeout(window.updateHeightTimeout);
      }
      window.updateHeightTimeout = setTimeout(updateContentHeight, 100);
    });
    
    if (outletRef.current) resizeObserver.observe(outletRef.current);
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    
    setTimeout(updateContentHeight, 100);
    window.addEventListener('load', updateContentHeight);
    
    return () => {
      if (window.updateHeightTimeout) clearTimeout(window.updateHeightTimeout);
      window.removeEventListener('load', updateContentHeight);
      resizeObserver.disconnect();
    };
  }, [isMobile, scale, pathname]);

  // 모바일에서 지정 페이지 외부 스크롤 차단
  useEffect(() => {
    if (
      isMobileNav &&
      (pathname === "/" || pathname === "/2page" || pathname === "/3page" || pathname === "/4page" || pathname === "/5page")
    ) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobileNav, pathname]);

  const OutletWrapper = () => (
    <div ref={outletRef}>
      <Outlet />
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
            transform: "translateZ(0)",
            willChange: "scroll-position",
          }}
        >
          <div
            ref={contentRef}
            className="flex justify-center w-full"
            style={{
              height: typeof contentHeight === 'string' ? contentHeight : `${contentHeight * scale}px`,
              minHeight: "100vh",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <div
              className="flex flex-col w-full"
              style={{
                width: "1920px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                minHeight: isMobile ? "100%" : "auto",
                willChange: "transform",
              }}
            >
              <div>{isMobile && isLoading ? <Loading /> : <OutletWrapper />}</div>
            </div>
          </div>
        </div>

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

        {!isLoading && <StopBanner style={{ zIndex: 60 }} />}

        <style jsx>{`
          div {
            scroll-behavior: smooth;
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
            requestAnimationFrame(() => {
              scrollContainerRef.current.scrollTop += e.deltaY;
            });
          }
        }}
      />
    </ScaleContext.Provider>
  );
};

export default Layout;