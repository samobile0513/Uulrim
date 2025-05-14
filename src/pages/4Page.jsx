import React, { useState } from 'react';
import Layout from '../components/0_Layout';
import MainImage from '../components/4p/1_MainImage';
import EducationTabs from '../components/4p/2_Texttitle';
import Edu1 from '../components/4p/3_Edu1';
import Edu2 from '../components/4p/4_Edu2';
import Edu3 from '../components/4p/5_Edu3';
import Edu4 from '../components/4p/6_Edu4';
import Edu5 from '../components/4p/7_Edu5';
import End from '../components/4p/8_End';

const FourthPage = () => {
  const [activeTab, setActiveTab] = useState('필수교육-법정 의무 교육');

  return (
    <>
        <MainImage />
        <EducationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 탭에 따라 다른 내용 보여주기 */}
        {activeTab === '필수교육-법정 의무 교육' && <Edu1 />}
        {activeTab === '직무별 의무교육-법정 의무 교육' && <Edu2 />}
        {activeTab === '직무별 의무교육-직무 교육' && <Edu3 />}
        {activeTab === '직무별 의무교육-소양 교육' && <Edu4 />}
        {activeTab === '직무별 의무교육-기업 행사 대행' && <Edu5 />}

        <End />
    </>
  );
};

export default FourthPage;
