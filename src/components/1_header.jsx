import React from 'react';
import { Link } from 'react-router-dom'; // Link import

const Header = () => {
  return (
    <header className="w-full h-[80.56px] bg-[#01A69F] flex items-center justify-center fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        {/* 왼쪽 텍스트 */}
        <span
          className="text-[15px] font-normal text-white"
          style={{ fontFamily: 'Paperlogy-4Regular' }}
        >
          장애인 고용부담금 감면
        </span>

        {/* 오른쪽 '지금 문의하기' + 아이콘 묶음 */}
        <div className="flex items-center gap-2">
          <Link
            to="/survey"  // Survey 페이지로 이동
            className="text-[20px] font-bold text-[#FAD53B]"
            style={{ fontFamily: 'Paperlogy-7Bold' }}
          >
            지금 문의하기
          </Link>
          <Link to="/survey">
            <img 
              src="/vector1.svg" 
              alt="arrow" 
              className="w-[16px] h-[16px]" 
              style={{ transform: 'translateY(1px)' }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
