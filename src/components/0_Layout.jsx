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
    // 스크롤 이벤트 디바운싱 적용
    let timeoutId = null;
    
    const handleScroll = () => {
      // 이미 타임아웃이 설정되어 있으면 취소
      if (timeoutId) {
        return;
      }
      
      // 16ms(약 60fps)마다 실행되도록 설정
      timeoutId = setTimeout(() => {
        const scrollTop = 
          scrollContainerRef.current?.scrollTop ?? window.scrollY;
        setIsScrolled(scrollTop > 0);
        timeoutId = null;
      }, 16);
    };

    // 모바일이면 scrollContainerRef만 사용, 아니면 window 사용
    const scrollElement = isMobileNav && scrollContainerRef.current 
      ? scrollContainerRef.current 
      : window;
    
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 감지

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
  const [contentHeight, setContentHeight] = useState("100vh"); // 기본값 설정
  const { pathname } = useLocation();
  const scrollContainerRef = useRef();
  const contentRef = useRef();
  const outletRef = useRef();
  const footerRef = useRef();

  // 메모이제이션된 값들 사용
  const navHeight = isMobileNav ? 65 : 50;
  const headerHeight = isMobileNav ? 52 : 80.56;
  const totalPadding = isMobileNav ? headerHeight + navHeight : 122;
  const extraPadding =
    !isMobileNav && window.innerWidth > 819 && window.innerWidth <= 1920
      ? 20
      : 0;

  // 페이지 변경 시 스크롤 상단으로
  useEffect(() => {
    if (window.__isModalOpen) return;
    if (pathname.includes("surveyform")) return;
    
    // requestAnimationFrame 사용하여 최적화
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        scrollContainerRef.current.scrollTop = 0;
      });
    }
  }, [pathname]);

  // 화면 크기 변경 감지 및 스케일 조정
  useEffect(() => {
    // 리사이즈 이벤트 디바운싱
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
          setScale(0.85); // 1920px 이상에서 콘텐츠 scale 고정
        }
      }, 100); // 100ms의 디바운스 시간
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 실행
    
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 모바일 로딩 처리
  useEffect(() => {
    if (isMobile) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500); // 로딩 시간 단축
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // 컨텐츠 높이 업데이트 최적화
  useEffect(() => {
    const updateContentHeight = () => {
      // 렌더링 최적화를 위해 requestAnimationFrame 사용
      requestAnimationFrame(() => {
        if (!outletRef.current) return;
        
        // 실제 필요한 높이 계산
        let totalHeight = 0;
        totalHeight += outletRef.current.getBoundingClientRect().height;
        
        if (footerRef.current) {
          totalHeight += footerRef.current.getBoundingClientRect().height;
        }
        
        // 고해상도에서 여백 최소화 - 더 정확한 높이 계산
        const screenWidth = window.innerWidth;
        let extraSpace = 50; // 기본 여백
        
        // 3840 해상도 대응
        if (screenWidth > 2560) {
          extraSpace = 10; // 여백 최소화
        } else if (screenWidth > 1920) {
          extraSpace = 20; // 중간 규모 여백
        }
        
        // 높이가 너무 작으면 기본값 사용
        if (totalHeight < window.innerHeight) {
          setContentHeight("100vh");
        } else {
          setContentHeight(totalHeight + extraSpace);  // 직접 숫자값으로 설정하여 계산 정확도 향상
        }
      });
    };

    // ResizeObserver 성능 최적화
    const resizeObserver = new ResizeObserver(() => {
      // 디바운싱 적용
      if (window.updateHeightTimeout) {
        clearTimeout(window.updateHeightTimeout);
      }
      window.updateHeightTimeout = setTimeout(updateContentHeight, 100);
    });
    
    if (outletRef.current) resizeObserver.observe(outletRef.current);
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    
    // 초기 높이 설정
    setTimeout(updateContentHeight, 100); // 초기 실행 약간 지연
    window.addEventListener('load', updateContentHeight); // 모든 리소스 로드 후에도 한번 더 확인
    
    return () => {
      if (window.updateHeightTimeout) clearTimeout(window.updateHeightTimeout);
      window.removeEventListener('load', updateContentHeight);
      resizeObserver.disconnect();
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
            // 하드웨어 가속 활성화
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
              // 하드웨어 가속 활성화
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
                // 하드웨어 가속 활성화
                willChange: "transform",
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
            // requestAnimationFrame으로 스크롤 이벤트 최적화
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