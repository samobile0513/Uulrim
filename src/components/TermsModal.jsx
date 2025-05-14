import React, { useEffect, useRef } from "react";

const TermsModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollYRef = useRef(0); // 스크롤 위치 저장용

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    // 스크롤 이벤트 전파 차단 함수
    const preventScrollPropagation = (e) => {
      const target = scrollRef.current;
      if (!target) return;

      const { scrollTop, scrollHeight, clientHeight } = target;
      const wheelDelta = e.deltaY;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if ((atTop && wheelDelta < 0) || (atBottom && wheelDelta > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 터치 이벤트 전파 차단 (모바일 지원)
    const preventTouchPropagation = (e) => {
      const target = scrollRef.current;
      if (!target) return;

      const { scrollTop, scrollHeight, clientHeight } = target;
      const touchDelta = e.touches[0].clientY;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if ((atTop && touchDelta > 0) || (atBottom && touchDelta < 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      // 현재 스크롤 위치 저장
      scrollYRef.current = window.scrollY;

      // body를 고정하고 스크롤 위치 유지
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0; // 모달 내부 스크롤 맨 위로
          scrollRef.current.focus();
        }
        if (modalRef.current) {
          modalRef.current.scrollTop = 0; // 모달 자체 스크롤 초기화
        }
      }, 0);

      document.addEventListener("keydown", handleKeyDown);
      scrollRef.current?.addEventListener("wheel", preventScrollPropagation, { passive: false });
      scrollRef.current?.addEventListener("touchmove", preventTouchPropagation, { passive: false });
    } else {
      // body 스타일 복원 및 스크롤 위치 복원
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });

      document.removeEventListener("keydown", handleKeyDown);
      scrollRef.current?.removeEventListener("wheel", preventScrollPropagation);
      scrollRef.current?.removeEventListener("touchmove", preventTouchPropagation);
    }

    return () => {
      // 컴포넌트 언마운트 시 정리
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      document.removeEventListener("keydown", handleKeyDown);
      scrollRef.current?.removeEventListener("wheel", preventScrollPropagation);
      scrollRef.current?.removeEventListener("touchmove", preventTouchPropagation);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start animate-fade"
      style={{ paddingTop: "calc(150px + env(safe-area-inset-top, 0px))" }}
      tabIndex={-1}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative bg-white w-[90%] max-w-[900px] max-h-[90vh] rounded-lg shadow-lg outline-none overflow-hidden"
        tabIndex={-1}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-[124px] right-4 text-2xl font-bold z-10"
          onClick={onClose}
        >
          ×
        </button>

        {/* 내부 스크롤 영역 */}
        <div
          ref={scrollRef}
          className="p-6 overflow-y-auto h-[90vh] focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default TermsModal;