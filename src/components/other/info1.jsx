import React, { useEffect, useState } from "react";


const Info1 = () => {
  const [termsText, setTermsText] = useState("");

  useEffect(() => {
    fetch("/info1.txt") // public 폴더 안에 info1.txt 넣어야 함
      .then((res) => res.text())
      .then((text) => setTermsText(text))
      .catch((err) => {
        console.error("이용약관을 불러오는 중 오류 발생:", err);
        setTermsText("이용약관을 불러오지 못했습니다.");
      });
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>


      <div
        style={{
          marginTop: "150px",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Paperlogy-5Medium",
            fontSize: "48px",
            marginBottom: "100px",
          }}
        >
          이용약관
        </h1>

        <div
          style={{
            fontFamily: "Paperlogy-4Regular",
            fontSize: "12px",
            maxWidth: "800px",
            whiteSpace: "pre-wrap",
            marginBottom: "150px",
            lineHeight: "1.6",
          }}
        >
          {termsText}
        </div>
      {/* 4_end.svg */}
      <img src="/4p/4_end.svg" alt="End" />

      {/* 372px 여백 */}
      <div style={{ height: "202px" }} />
            </div>
    </div>
  );
};

export default Info1;
