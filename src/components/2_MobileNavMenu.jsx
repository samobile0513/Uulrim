import React, { useState } from 'react';
import { Link } from "react-router-dom";

const menuItems = [
  { label: '어울림이란', path: '/' },
  { label: '장애인고용부담금이란', path: '/2page' },
  { label: '생산물품구매', path: '/3page' },
  { label: '교육&엔터서비스', path: '/4page' },
  { label: '동행하는 사람들', path: '/5page' },
];

const MobileNavMenu = ({ mobileScale, style, isScrolled }) => {
  const [open, setOpen] = useState(false);

  const logoHeight = 50;
  const navHeight = 0;
  const menuWidth = 185;
  const totalExcludedHeight = 82 + 30 + logoHeight + 40;
  const menuHeight = `calc((100vh - ${totalExcludedHeight}px) / 2)`;

  return (
    <div className="block custom-819:block hidden">
      {/* 상단 고정 네브바 */}
      <div
        style={{
          position: "fixed",
          top: isScrolled ? "0px" : "52px",
          left: 0,
          width: "100vw",
          height: `${navHeight}px`,
          backgroundColor: "white",
          zIndex: 99,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 25px",
          borderTop: "1px solid #333333",
          borderBottom: "1px solid #333333",
          transition: "top 0.3s ease",
          ...style
        }}
      >
        <img
          src="/Mtitle.svg"
          alt="logo"
          style={{ width: "90px", height: `${logoHeight}px` }}
        />
        <button
          onClick={() => setOpen(true)}
          style={{
            height: `${navHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/Mburger.svg" alt="menu" style={{ width: "26px" }} />
        </button>
      </div>

      {/* 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 슬라이드 메뉴 */}
      {open && (
        <div
          className="fixed right-0 bg-[#00A9A4] z-[9999] flex flex-col"
          style={{
            top: isScrolled ? `${navHeight}px` : `${52 + navHeight}px`, // 네비게이션 바 최상단 기준
            width: `${menuWidth}px`,
            height: `calc(${menuHeight} * 2.5)`,
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "40px",
            paddingBottom: 0,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-[20px] right-[20px] text-white text-[28px] z-[10000] hover:text-[#FFD400] transition-colors"
            aria-label="닫기"
          >
            ×
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: "40px",
            }}
          >
            <img
              src="/Mtitle.svg"
              alt="logo"
              style={{ width: "90px", height: `${logoHeight}px` }}
            />
          </div>

          <nav
            className="flex flex-col justify-start"
            style={{
              gap: "18px",
              height: `calc(${menuHeight} - ${(30 + logoHeight + 40)}px)`,
            }}
          >
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'font-6',
                  fontSize: "13.08px",
                }}
                className="text-white hover:text-[#FFD400] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavMenu;