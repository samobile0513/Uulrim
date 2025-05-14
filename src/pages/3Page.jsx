import React from 'react';
import Layout from '../components/0_Layout';
import MainImage from '../components/3p/1_MainImage';
import BuySection from '../components/1p/4_BuySection';
import ProofSection from '../components/1p/5_ProofSection';
import ProductSection from '../components/1p/6_ProductSection';
import ServiceSection from '../components/3p/2_ServiceSection';
import DisabilityEmploymentSection from '../components/2p/2_DisabilityEmploymentSection';
import RelatedEmploymentSection from '../components/2p/3_RelatedEmploymentSection';
import EmploymentEffectSection from '../components/2p/4_EmploymentEffectSection'; // ⭐ 추가
import PurchaseFromStandardBusiness from '../components/2p/5_PurchaseFromStandardBusiness'; // ⭐ 추가
import GoodCompaniesSection from '../components/2p/6_GoodCompaniesSection'; // ⭐ 추가





const SecondPage = () => {
  return (
    <>
        <MainImage />
        <BuySection />
        <ProofSection />
        <ProductSection />
        <ServiceSection />
        <DisabilityEmploymentSection />
        <RelatedEmploymentSection />
        <EmploymentEffectSection /> {/* 여기 추가 */}
        <PurchaseFromStandardBusiness /> {/* 여기 추가 */}
        <GoodCompaniesSection /> {/* 여기 추가 */}
    </>
  );
};

export default SecondPage;
