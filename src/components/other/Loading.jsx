import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src="/B1p/B_title.svg"
        alt="Loading Logo"
        className="loading-logo"
      />
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;