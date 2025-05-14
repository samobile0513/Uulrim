import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);
  const [adjustedHeight, setAdjustedHeight] = useState('auto');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1200) {
        setScale(1.3);
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const baseHeight = contentRef.current.offsetHeight;
      setAdjustedHeight(baseHeight * scale);
    }
  }, [scale]);

  return (
    <div className="w-full flex flex-col items-center pt-[40px]">
      {/* 🔹 상단 고정 콘텐츠 */}
      <div className="w-full flex flex-col items-center">
        <img src="/1p/1_31.svg" alt="1_31" className="mx-auto" />
        <div className="mt-[120px]" />
        <img src="/1p/1_32.svg" alt="1_32" className="mx-auto" />
        <div className="mt-[49px]" />
        <img src="/1p/1_33.svg" alt="1_33" className="mx-auto" />
        <div className="mt-[145px]" />
        <img src="/1p/1_34.svg" alt="1_34" className="mx-auto" />
        <div className="mt-[9px] relative flex justify-center w-full">
          <img src="/1p/1_35.svg" alt="1_35" className="relative left-[190px]" />
        </div>
      </div>

      {/* 🔹 확대 적용될 구간: 1_36 ~ 1_38 */}
      <div
        className="w-full flex justify-center overflow-y-hidden overflow-x-visible mt-[62px]"
        style={{ height: adjustedHeight }}
      >
        <div
          ref={contentRef}
          className="w-[820px]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <img src="/1p/1_36.svg" alt="1_36" className="mx-auto" />
          <div className="mt-[40px]" />
          <img src="/1p/1_37.svg" alt="1_37" className="mx-auto" />
          <div className="mt-[101px]" />
          <img src="/1p/1_38.png" alt="1_38" className="mx-auto" />
        </div>
      </div>

      {/* 🔹 확대 제외: 1_39 원래 비율로 출력 */}
      <div className="mt-[49px]">
        <img src="/1p/1_39.svg" alt="1_39" className="mx-auto" />
      </div>
      <div className="mt-[47px]" />
    </div>
  );
};

export default AboutSection;
