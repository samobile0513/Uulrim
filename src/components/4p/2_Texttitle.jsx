import React from "react";

const EducationTabs = ({ activeTab, setActiveTab }) => {  // ✅ props로 받아야 함

  const tabs = [
    { group: "필수교육", label: "법정 의무 교육" },
    { group: "직무별 의무교육", label: "법정 의무 교육" },
    { group: "직무별 의무교육", label: "직무 교육" },
    { group: "직무별 의무교육", label: "소양 교육" },
    { group: "직무별 의무교육", label: "기업 행사 대행" },
  ];

  return (
    <div className="flex flex-col items-center mb-[150px] mt-[108px]">
      {/* 탭 묶음 */}
      <div className="flex justify-center gap-[40px]">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => setActiveTab(`${tab.group}-${tab.label}`)}
          >
            {/* 위에 작은 글씨 */}
            <span
              className={`text-[16px] mb-1 ${
                index > 1 ? "text-white" : "text-gray-500"
              }`}
            >
              {tab.group === "필수교육" ? "(필수교육)" : "(직무별 의무교육)"}
            </span>

            {/* 큰 글씨 */}
            <span
              className={`text-[30px] font-[Paperlogy] transition-all duration-300 ${
                activeTab === `${tab.group}-${tab.label}`
                  ? "text-teal-500"
                  : "text-black"
              } group-hover:text-teal-500`}
            >
              {tab.label}
            </span>

            {/* 기본 회색 라인 + 클릭/호버 시 변경 */}
            <div className="relative h-[2px] w-full bg-[#333333] group-hover:bg-teal-500">
              {activeTab === `${tab.group}-${tab.label}` && (
                <>
                  {/* 왼쪽 동그라미 */}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[8px] h-[8px] bg-teal-500 rounded-full"></div>
                  {/* 오른쪽 동그라미 */}
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[8px] h-[8px] bg-teal-500 rounded-full"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTabs;
