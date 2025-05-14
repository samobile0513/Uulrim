import React, { useEffect, useState, useRef } from 'react';

const MainSection = () => {
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

  // ✅ scale 변경 후 실제 높이 계산
  useEffect(() => {
    if (contentRef.current) {
      const baseHeight = contentRef.current.offsetHeight;
      setAdjustedHeight(baseHeight * scale);
    }
  }, [scale]);

  return (
    <div
      className="w-full flex justify-center overflow-hidden"
      style={{ height: adjustedHeight }}
    >
      <div
        ref={contentRef}
        style={{
          width: '820px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <div className="flex flex-col items-center pt-[87px]">
          <div className="w-[820px] h-[351px] relative flex flex-col items-center">
            <img src="/1p/1_21.svg" alt="어울림이란" />

            <div className="w-full relative flex justify-between">
              <img src="/1p/1_22.svg" className="absolute left-0 top-[58px]" alt="왼쪽" />
              <img src="/1p/1_23.svg" className="absolute right-0 top-[38px] z-10" alt="오른쪽" />
            </div>
          </div>

          <div className="mt-[23px] w-[820px] flex justify-start">
            <img src="/1p/1_24.svg" alt="하단1" />
          </div>

          <div className="mt-[44px] flex justify-center w-full">
            <img src="/1p/1_25.svg" alt="하단2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
