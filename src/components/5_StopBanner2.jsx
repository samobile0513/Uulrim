import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsultPopup from "./other/ConsultPopup.jsx";

const StopBanner = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showConsultPopup, setShowConsultPopup] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // 숨김 상태 추가

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1200) {
        const newScale = width / 393;
        setScale(newScale > 1 ? 1 : newScale);
        setIsHidden(true); // 1200px 이하일 때 숨김
      } else {
        setScale(1);
        setIsHidden(false); // 1200px 초과일 때 표시
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePopupClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConsultClick = () => {
    setShowConsultPopup(true);
  };

  const handleCloseConsultPopup = () => {
    setShowConsultPopup(false);
  };

  const handleConsultSelect = (type) => {
    if (type === "internet") {
      navigate("/3_Surveyform2");
    } else if (type === "phone") {
      navigate("/2_Surveyform");
    }
    setShowConsultPopup(false);
  };

  if (isHidden) return null; // 1200px 이하일 때 렌더링 안 함

  return (
    <>
      <footer
        className="fixed bottom-0 left-0 w-full z-50 flex justify-center"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "bottom center",
          height: `${120 * scale}px`,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          overflow: "hidden",
        }}
      >
        <div className="min-w-[1920px] flex items-center justify-between px-[400px]">
          {/* 왼쪽 영역 */}
          <div className="flex items-center gap-[20px]">
            <a href="tel:1551-1531">
              <img src="/stop1.svg" alt="전화" className="h-[38px]" />
            </a>
            <div onClick={handlePopupClick}>
              <img src="/stop2.svg" alt="1551-1531" className="h-[38px]" />
            </div>
            <div onClick={handlePopupClick}>
              <img src="/stop3.svg" alt="상담 안내" className="h-[38px]" />
            </div>
          </div>

          {/* 오른쪽 버튼 영역 */}
          <div className="flex items-center gap-[16px]">
            <button onClick={handleConsultClick}>
              <img src="/stop4.svg" alt="상담신청" className="h-[48px]" />
            </button>
            <a
              href="http://pf.kakao.com/_DWxdsn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/stop5.svg" alt="카카오톡 상담" className="h-[48px]" />
            </a>
            <div onClick={handlePopupClick}>
              <img src="/stop6.svg" alt="전화 상담" className="h-[48px]" />
            </div>
          </div>
        </div>
      </footer>

      {/* 팝업창 (전화 상담) */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(255, 51, 51, 0.3)",
            zIndex: 100,
            animation: "sparkle 1.5s infinite",
            border: "2px solid #FD3941",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Paperlogy-5Medium",
                fontSize: "20px",
                color: "#333333",
                marginBottom: "20px",
              }}
            >
              1551-1531 연락 주시면
              <br />
              친절하게 상담해드립니다 ✨
            </p>
            <button
              onClick={handleClosePopup}
              style={{
                backgroundColor: "#333333",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "Paperlogy-5Medium",
                fontSize: "16px",
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 팝업창 (상담 신청 선택) - ConsultPopup 사용 */}
      <ConsultPopup
        isOpen={showConsultPopup}
        onClose={handleCloseConsultPopup}
      />

      {/* 팝업 오버레이 */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
          }}
          onClick={handleClosePopup}
        />
      )}

      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            box-shadow: 0 4px 15px rgba(255, 51, 51, 0.3);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 51, 51, 0.6);
          }
        }
      `}</style>
    </>
  );
};

export default StopBanner;
