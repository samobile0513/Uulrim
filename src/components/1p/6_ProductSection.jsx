import React from 'react';

const ProductSection = () => {
  return (
    <div className="relative py-[111px] overflow-hidden">
      {/* 배경 확장용 레이어 */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#EFEFEF] z-0" />

      {/* 실제 콘텐츠 */}
      <div className="relative z-10 max-w-[1920px] mx-auto flex flex-col items-center px-4">
        <img src="/1p/1_61.png" alt="1_61" />

        <div className="mt-[74px]" />

        <div className="relative flex justify-center w-full">
          <img src="/1p/1_62.png" alt="1_62" className="relative left-[20px]" />
        </div>

        <div className="mt-[93px]" />

        <img src="/1p/1_63.png" alt="1_63" />
      </div>
    </div>
  );
};

export default ProductSection;
