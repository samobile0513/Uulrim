import React, { useEffect, useRef, useState, useContext } from "react";
import { ScaleContext } from "./0_Layout";
import ReactDOM from "react-dom";

const Footer = () => {
  const [scrollY, setScrollY] = useState(0);
  const [footerScale, setFooterScale] = useState(1);
  const contentRef = useRef(null);
  const [adjustedHeight, setAdjustedHeight] = useState("auto");
  const [loaded, setLoaded] = useState(false);
  const layoutScale = useContext(ScaleContext);
  const [isPopupOpenInfo1, setIsPopupOpenInfo1] = useState(false);
  const [isPopupOpenInfo2, setIsPopupOpenInfo2] = useState(false);
  const [isPopupOpenInfo3, setIsPopupOpenInfo3] = useState(false);
  const [info1Text, setInfo1Text] = useState("");
  const [info2Text, setInfo2Text] = useState("");
  const [info3Text, setInfo3Text] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 819);
      if (width <= 390) {
        setFooterScale(0.7);
      } else if (width <= 1200) {
        setFooterScale(0.8);
      } else {
        setFooterScale(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const baseHeight = contentRef.current.offsetHeight;
      const paddedHeight = baseHeight + 0;
      setAdjustedHeight(paddedHeight * footerScale);
      setLoaded(true);
    }
  }, [footerScale]);

  useEffect(() => {
    if (isPopupOpenInfo1) {
      fetch("/info1.txt")
        .then((res) => res.text())
        .then((text) => setInfo1Text(text))
        .catch((err) => {
          console.error("텍스트 로드 실패:", err);
          setInfo1Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo1]);

  useEffect(() => {
    if (isPopupOpenInfo2) {
      fetch("/info2.txt")
        .then((res) => res.text())
        .then((text) => setInfo2Text(text))
        .catch((err) => {
          console.error("info2 텍스트 로드 실패:", err);
          setInfo2Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo2]);

  useEffect(() => {
    if (isPopupOpenInfo3) {
      fetch("/info3.txt")
        .then((res) => res.text())
        .then((text) => setInfo3Text(text))
        .catch((err) => {
          console.error("info3 텍스트 로드 실패:", err);
          setInfo3Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo3]);

  return (
    <>
      <div
        className="w-full flex justify-center overflow-x-visible pt-[50px] pb-[50px]"
        style={{ minHeight: adjustedHeight, backgroundColor: "#3D3D3D" }}
      >
        <div
          ref={contentRef}
          className="w-full flex flex-col items-start min-w-[1920px]"
          style={{
            zoom: footerScale / layoutScale,
            transformOrigin: "top center",
            paddingLeft: "369px",
            transform:
              window.innerWidth <= 1200 ? "translateX(400px)" : "translateX(0)",
          }}
        >
          <img src="/footer.svg" alt="footer-part1" />
          <div className="mt-[10px]" />

          <div className="mt-[0px] flex items-center">
            <div
              onClick={() => setIsPopupOpenInfo2(true)}
              className="hover:opacity-80 transition-all duration-300 mr-[14px] cursor-pointer"
            >
              <img src="/footer1.svg" alt="서비스 이용약관" />
            </div>
            <img src="/footerline.svg" alt="line1" className="mr-[14px]" />
            <div
              onClick={() => setIsPopupOpenInfo1(true)}
              className="hover:opacity-80 transition-all duration-300 mr-[14px] cursor-pointer"
            >
              <img src="/footer2.svg" alt="개인정보 처리방침" />
            </div>
            <img src="/footerline.svg" alt="line2" className="mr-[14px]" />
            <div
              onClick={() => setIsPopupOpenInfo3(true)}
              className="hover:opacity-80 transition-all duration-300 cursor-pointer"
            >
              <img src="/footer3.svg" alt="마케팅 정보 수신동의" />
            </div>
          </div>
          <div className="mt-[10px]" />
          <img src="/footerend.svg" alt="footer-end" />
        </div>
      </div>

      {isPopupOpenInfo1 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[32px] font-bold text-[#000000] text-center">
                    이용 약관
                  </h2>
                </div>
                <div
                  className={`flex-1 p-10 whitespace-pre-wrap ${
                    isMobile ? "text-[10px]" : "text-[15px]"
                  } leading-relaxed text-black`}
                >
                  {info1Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo1(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo1(false)}
            />
          </>,
          document.body
        )}

      {isPopupOpenInfo2 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[32px] font-bold text-[#000000] text-center">
                    개인정보 처리방침
                  </h2>
                </div>
                <div
                  className={`flex-1 p-10 whitespace-pre-wrap ${
                    isMobile ? "text-[10px]" : "text-[15px]"
                  } leading-relaxed text-black`}
                >
                  {info2Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo2(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo2(false)}
            />
          </>,
          document.body
        )}

      {isPopupOpenInfo3 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[32px] font-bold text-[#000000] text-center">
                    마케팅 정보 수신 동의
                  </h2>
                </div>
                <div
                  className={`flex-1 p-10 whitespace-pre-wrap ${
                    isMobile ? "text-[10px]" : "text-[15px]"
                  } leading-relaxed text-black`}
                >
                  {info3Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo3(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo3(false)}
            />
          </>,
          document.body
        )}
    </>
  );
};

export default Footer;
