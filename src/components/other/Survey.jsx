import React, { useState, useEffect } from 'react';
import Layout from '../0_Layout';
import MainImage from '../6p/1_MainImage';
import White from '../6p/3_White';
import Surveyform from '../6p/2_Surveyform';
import Surveyform2 from '../6p/2_Surveyformmobile';
import End from '../4p/8_End';

const SixPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 819);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 819);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ["각종 소모품", "판촉물 및 선물세트", "교육", "기업 행사"];

  console.log("SixPage 렌더링됨, categories:", categories);

  return (
    <>
      <MainImage />
      <White />
      {isMobile ? <Surveyform2 categories={categories} /> : <Surveyform />}
      <End />
    </>
  );
};

export default SixPage;