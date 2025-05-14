import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 모달이 열려 있거나 최근 닫힌 직후면 스크롤 이동 차단
    if (window.__isModalOpen) {
      console.log("ScrollToTop skipped due to open modal, pathname:", pathname);
      return;
    }

    console.log("ScrollToTop executed, pathname:", pathname);
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;