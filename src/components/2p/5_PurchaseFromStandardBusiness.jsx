import React from 'react';
import { Link } from 'react-router-dom';


const PurchaseFromStandardBusiness = () => {
  return (
    <div className="w-full flex flex-col items-center pt-[136px]">
      <img src="/2p/2_41.png" alt="2_41" />
      <div className="mt-[130px]" />
      <img src="/2p/2_42.svg" alt="2_42" className="transform translate-x-[330px]" />
      <div className="mt-[60px]" />
      <img src="/2p/2_43.svg" alt="2_43" />
      <div className="mt-[90px]" />
        <Link
          to="/survey"
          className="transition-all duration-300 hover:scale-105 hover:brightness-110"
        >
          <img src="/1p/1_75.svg" alt="구매 상담 버튼" />
        </Link>
        <div className="mt-[339px]" />
        <img src="/1p/1_76.svg" alt="1_76" />
        <div className="mt-[237px]" />
    </div>
  );
};

export default PurchaseFromStandardBusiness;