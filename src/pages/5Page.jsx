import React from 'react';
import Layout from '../components/0_Layout';
import MainImage from '../components/5p/1_MainImage';
import Character from '../components/5p/2_Character';
import Autho from '../components/5p/2_Autho';
import Whatcomp from '../components/5p/4_Whatcomp';
import PurchaseFromStandardBusiness from '../components/2p/5_PurchaseFromStandardBusiness'; // ⭐ 추가
import GoodCompaniesSection from '../components/5p/5_GoodCompaniesSection'; // ⭐ 추가





const SecondPage = () => {
  return (
    <>
        <MainImage />
        <Autho />
        <Character />
        <Whatcomp />
        <PurchaseFromStandardBusiness /> {/* 여기 추가 */}
        <GoodCompaniesSection /> {/* 여기 추가 */}
    </>
  );
};

export default SecondPage;
