import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const MobileSurvey = (props) => {
  const navigate = useNavigate();
  const {
    error,
    categories,
  } = props;

  const [form, setForm] = useState({
    company: "",
    manager: "",
    phone: "",
    businessType: "",
    category: "",
    additional: "",
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    all: false,
  });

  const [submitError, setSubmitError] = useState(error || "");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreement = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setAgreements({
        terms: checked,
        privacy: checked,
        marketing: checked,
        all: checked,
      });
    } else {
      setAgreements((prev) => {
        const updated = { ...prev, [name]: checked };
        updated.all = updated.terms && updated.privacy && updated.marketing;
        return updated;
      });
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit 호출 (모바일)");
    if (!agreements.terms || !agreements.privacy) {
      setSubmitError("약관에 동의해 주세요.");
      console.log("약관 미동의");
      return;
    }
    setSubmitError("");

    try {
      console.log("Firebase 제출 시도");
      await addDoc(collection(db, "submissions"), {
        ...form,
        agreements,
        type: "fit",
        timestamp: new Date().toISOString(),
      });
      console.log("Firebase 제출 성공");
      alert("제출 완료되었습니다!");
      console.log("navigate to /4_End");
      navigate("/4_End");
      setForm({
        company: "",
        manager: "",
        phone: "",
        category: "",
        businessType: "",
        additional: "",
      });
      setAgreements({
        terms: false,
        privacy: false,
        marketing: false,
        all: false,
      });
    } catch (err) {
      console.error("제출 실패:", err);
      alert("제출 중 오류가 발생했습니다.");
      setSubmitError("제출 중 오류가 발생했습니다.");
    }
  };

  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [isPopupOpenInfo1, setIsPopupOpenInfo1] = useState(false);
  const [isPopupOpenInfo2, setIsPopupOpenInfo2] = useState(false);
  const [isPopupOpenInfo3, setIsPopupOpenInfo3] = useState(false);
  const [info1Text, setInfo1Text] = useState("");
  const [info2Text, setInfo2Text] = useState("");
  const [info3Text, setInfo3Text] = useState("");

  useEffect(() => {
    if (isPopupOpenInfo1) {
      fetch("/info1.txt")
        .then((res) => res.text())
        .then((text) => setInfo1Text(text))
        .catch((err) => {
          console.error("텍스트 로드 실패:", err);
          setInfo1Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo1]);

  useEffect(() => {
    if (isPopupOpenInfo2) {
      fetch("/info2.txt")
        .then((res) => res.text())
        .then((text) => setInfo2Text(text))
        .catch((err) => {
          console.error("info2 텍스트 로드 실패:", err);
          setInfo2Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo2]);

  useEffect(() => {
    if (isPopupOpenInfo3) {
      fetch("/info3.txt")
        .then((res) => res.text())
        .then((text) => setInfo3Text(text))
        .catch((err) => {
          console.error("info3 텍스트 로드 실패:", err);
          setInfo3Text("약관을 불러오지 못했습니다.");
        });
    }
  }, [isPopupOpenInfo3]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const ratio = width <= 819 ? Math.max(Math.min((width / 819) * 1.3, 1.3), 1.3) : 1.3;
      setZoom(ratio);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center bg-white pt-[100px] pb-[100px]"
      style={{ zoom }}
    >
      <div className="w-[819px] px-4 font-[font-4]">
        <div className="flex flex-col items-center text-center mb-[120px]">
          <h2 className="text-[60px] text-[#01A69F] font-[font-8] mb-4">
            장애인 고용 부담금 감면의 길
          </h2>
          <h1 className="text-[55px] font-bold font-[font-5] mb-4">
            지금 바로 원하는 서비스 찾기
          </h1>
          <p className="text-[30px]">
            원하시는 유형의 상품 카테고리와 회사정보를 입력 해주세요.
          </p>
        </div>

        {[
          { label: "회사명", name: "company", placeholder: "회사명을 입력해 주세요." },
          { label: "담당자명", name: "manager", placeholder: "담당자님의 성함을 입력해 주세요. EX 홍길동 과장" },
          { label: "연락처", name: "phone", placeholder: "010-0000-0000" },
          { label: "사업자or개인", name: "businessType", placeholder: "사업자인지 개인인지 적어주세요." },
        ].map(({ label, name, placeholder }) => (
          <div key={name} className="mb-12">
            <label className="text-[60px] block mb-4 pl-[20px]">{label}</label>
            <input
              name={name}
              value={form[name] || ""}
              onChange={handleInput}
              placeholder={placeholder}
              className="w-full border p-6 text-[30px] h-[120px]"
            />
          </div>
        ))}

        <div className="mb-[150px]">
          <label className="text-[60px] block mb-4 pl-[20px]">
            구매 희망 카테고리
          </label>
          <select
            name="category"
            value={form.category || ""}
            onChange={handleInput}
            className="w-full border p-6 text-[30px] h-[120px]"
            style={{ fontSize: '30px' }}
          >
            <option value="" style={{ fontSize: '15px' }}>선택하세요</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ fontSize: '15px' }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-[50px]">
          <h3 className="text-[80px] font-[font-7] mb-4 pl-[20px]">
            기타 요청사항
          </h3>
          <textarea
            name="additional"
            value={form.additional || ""}
            onChange={handleInput}
            placeholder="추가로 상담 받고 싶은 내용이 있다면 적어주세요."
            className="w-full border p-6 text-[35px]"
            rows={10}
          />
        </div>

        <div className="mt-20">
          <div>
            <p className="text-black text-[50px] mb-4 pl-[20px]">
              약관을 확인해 주세요
            </p>
          </div>
          <div className="pl-[20px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms || false}
                  onChange={handleAgreement}
                  className="w-8 h-8"
                />
                <span
                  onClick={() => setIsPopupOpenInfo1(true)}
                  className="cursor-pointer text-black text-[50px]"
                >
                  서비스 이용약관 <span className="text-[35px]">(필수)</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agreements.privacy || false}
                  onChange={handleAgreement}
                  className="w-8 h-8"
                />
                <span
                  onClick={() => setIsPopupOpenInfo2(true)}
                  className="cursor-pointer text-black text-[50px]"
                >
                  개인정보처리방침 <span className="text-[35px]">(필수)</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing || false}
                  onChange={handleAgreement}
                  className="w-8 h-8"
                />
                <span
                  onClick={() => setIsPopupOpenInfo3(true)}
                  className="cursor-pointer text-black text-[50px]"
                >
                  마케팅 정보수신 동의 <span className="text-[35px] opacity-65">(선택)</span>
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="checkbox"
                  name="all"
                  checked={agreements.all || false}
                  onChange={handleAgreement}
                  className="w-8 h-8"
                />
                <span className="text-black text-[80px]">
                  전체 동의합니다.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-20 w-full bg-[#00B7A3] text-white py-8 rounded-md text-[72px] font-[font-8] mx-auto cursor-pointer" // cursor-pointer 추가
          >
            상담 예약
          </button>

          {submitError && (
            <p className="text-red-500 text-[56px] mt-8">{submitError}</p>
          )}
        </div>
      </div>

      {isPopupOpenInfo1 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[25px] font-bold text-[#000000] text-center">
                    이용 약관
                  </h2>
                </div>
                <div className="flex-1 p-10 whitespace-pre-wrap text-[10px] leading-relaxed text-black">
                  {info1Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo1(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo1(false)}
            />
          </>,
          document.body
        )}

      {isPopupOpenInfo2 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[25px] font-bold text-[#000000] text-center">
                    개인정보 처리방침
                  </h2>
                </div>
                <div className="flex-1 p-10 whitespace-pre-wrap text-[10px] leading-relaxed text-black">
                  {info2Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo2(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo2(false)}
            />
          </>,
          document.body
        )}

      {isPopupOpenInfo3 &&
        ReactDOM.createPortal(
          <>
            <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
              <div className="w-full max-w-[819px] h-[100vh] bg-white rounded-[30px] border-4 border-red-500 overflow-y-auto relative flex flex-col">
                <div className="sticky top-0 bg-white p-6 border-b z-10">
                  <h2 className="text-[25px] font-bold text-[#000000] text-center">
                    마케팅 정보 수신 동의
                  </h2>
                </div>
                <div className="flex-1 p-10 whitespace-pre-wrap text-[10px] leading-relaxed text-black">
                  {info3Text}
                </div>
                <div className="sticky bottom-0 bg-white p-6 border-t z-10">
                  <button
                    onClick={() => setIsPopupOpenInfo3(false)}
                    className="w-full bg-[#333333] text-white py-[20px] rounded-[10px] border-none cursor-pointer font-[Paperlogy-5Medium] text-[24px]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setIsPopupOpenInfo3(false)}
            />
          </>,
          document.body
        )}
    </div>
  );
};

export default MobileSurvey;
