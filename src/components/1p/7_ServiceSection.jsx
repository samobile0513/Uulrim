import React from 'react';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  return (
    <div className="w-full flex flex-col items-center pt-[100px]">
      <div className="w-full flex flex-col items-center">
        <img src="/1p/1_71.svg" alt="1_71" />
        <div className="mt-[52px]" />
        <img src="/1p/1_72.svg" alt="1_72" />
        <div className="mt-[98px]" />
        <img src="/1p/1_73.svg" alt="1_73" />
        <div className="mt-[150px]" />
        <img src="/1p/1_74.svg" alt="1_74" />
        <div className="mt-[100px]" />
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
    </div>
  );
};

export default ServiceSection;