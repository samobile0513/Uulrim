import React, { useEffect, useState } from 'react';
import StopBanner3 from './5_StopBanner3'; 

const StopBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 819);
    checkMobile(); // 초기 체크
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <StopBanner3 />
      ) : (
        <div className="fixed top-[310px] right-[20px] z-50">
          <div className="flex flex-col items-center">
            <div className="group mb-[20px]">
              <img src="/stop_banner_1.svg" alt="배너1" />
            </div>
            <div className="group mb-[20px]">
              <img src="/stop_banner_2.svg" alt="배너2" />
            </div>
            <a
              href="https://pf.kakao.com/_xeqbBn"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-[20px]"
            >
              <img src="/stop_banner_3.svg" alt="배너3" />
            </a>
            <a href="/survey" className="group">
              <img src="/stop_banner_4.svg" alt="배너4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default StopBanner;
