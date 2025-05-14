import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleConsultSelect = (type) => {
    if (type === 'internet') {
      navigate('/3_Surveyform2');
    } else if (type === 'phone') {
      navigate('/2_Surveyform');
    }
    onClose();
  };

  if (!isOpen) return null;

  // 디버깅: 팝업 위치 값 콘솔 출력
  console.log({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '310px',
    height: '230px'
  });

  return (
    <>
      {/* 팝업창 */}
      <div
        className="fixed top-[50%] left-[50%] bg-white p-8 rounded-[20px] shadow-[0_4px_15px_rgba(255,51,51,0.3)] border-2 border-[#FD3941]"
        style={{
          width: '310px', // 고정 너비 (조정 가능, 예: '350px')
          height: '230px', // 고정 높이 (조정 가능, 예: '250px')
          transform: 'translate(-50%, -50%)', // 정 중앙 배치
          zoom: '1 !important', // 상위 zoom 차단
          zIndex: '1000', // 최상위 렌더링
          outline: '2px solid red' // 디버깅용 경계선 (테스트 후 제거)
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="font-[Paperlogy-5Medium] text-[20px] text-[#333333] mb-5">
            어떤 상담을 원하십니까? ✨
          </p>
          <div className="flex gap-[10px] justify-center mb-5">
            <button
              onClick={() => handleConsultSelect('internet')}
              className="bg-[#FD3941] text-white py-[10px] px-5 rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[16px]"
            >
              인터넷
            </button>
            <button
              onClick={() => handleConsultSelect('phone')}
              className="bg-[#5DDFDE] text-white py-[10px] px-5 rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[16px]"
            >
              휴대폰
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-[#333333] text-white py-[10px] px-5 rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[16px]"
          >
            닫기
          </button>
        </div>
      </div>

      {/* 팝업 오버레이 */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999]"
        onClick={onClose}
      />

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(255, 51, 51, 0.3);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 51, 51, 0.6);
          }
        }
      `}</style>
    </>
  );
};

export default ConsultPopup;