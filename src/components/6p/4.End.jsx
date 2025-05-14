import React, { useEffect, useRef, useState } from "react";

const CharacterSection = () => {
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);
  const [adjustedHeight, setAdjustedHeight] = useState("auto");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScale(width <= 3840 ? 10 : 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const baseHeight = contentRef.current.offsetHeight;
      const paddedHeight = baseHeight + 0;
      setAdjustedHeight(paddedHeight * scale);
      setLoaded(true);
    }
  }, [scale]);

  return (
    <div
      className="w-full flex justify-center overflow-x-visible pt-[30px]"
      style={{ minHeight: adjustedHeight }}
    >
      <div
        ref={contentRef}
        className="w-[820px] flex flex-col items-center"
        style={{
          zoom: scale,
          transformOrigin: "top center",
        }}
      >
        <img src="/End.svg" alt="5_1" />
      </div>
    </div>
  );
};

export default CharacterSection;
