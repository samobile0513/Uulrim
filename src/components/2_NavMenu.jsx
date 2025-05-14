import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavMenu = ({ isScrolled }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveMenu("어울림이란");
    else if (path === "/2page") setActiveMenu("장애인고용부담금이란");
    else if (path === "/3page") setActiveMenu("생산물품구매");
    else if (path === "/4page") setActiveMenu("교육&엔터서비스");
    else if (path === "/5page") setActiveMenu("동행하는 사람들");
  }, [location]);

  const menus = [
    { name: "어울림이란", path: "/" },
    { name: "장애인고용부담금이란", path: "/2page" },
    { name: "생산물품구매", path: "/3page" },
    { name: "교육&엔터서비스", path: "/4page" },
    { name: "동행하는 사람들", path: "/5page" },
  ];

  return (
    <nav
      className="w-full h-[62.22px] bg-white flex items-center fixed left-0 z-40 border-t border-b border-black"
      style={{
        top: isScrolled ? "0px" : "80px",
        transition: "top 0.3s ease",
      }}
    >
      <div className="w-full flex items-center">
        <div className="w-[462px]"></div>
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/title.svg"
              alt="어울림"
              className="h-[30px] min-w-[100px] object-contain"
            />
          </Link>
        </div>
        <div className="w-[462px]"></div>
        <div className="flex flex-row items-center gap-[20px]">
          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
              className={`text-[15.78px] cursor-pointer transition-opacity duration-300 whitespace-nowrap ${
                activeMenu === menu.name
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-black"
              }`}
              style={{ fontFamily: "Paperlogy-5Medium" }}
            >
              {menu.name}
            </Link>
          ))}
        </div>
        <div className="w-[426px]"></div>
      </div>
    </nav>
  );
};

export default NavMenu;
