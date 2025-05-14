import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalAdmin from "./pages/TotalAdmin";

import Layout from "./components/0_Layout";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/2Page";
import ThirdPage from "./pages/3Page";
import FourPage from "./pages/4Page";
import FivePage from "./pages/5Page";
import Survey from "./components/other/Survey";
import StopBanner from "./components/4_StopBanner";
import ScrollToTop from "./components/other/ScrollToTop";
import End from "./components/6p/4.End";
import Info1 from "./components/other/info1";
import Info2 from "./components/other/info2";
import Info3 from "./components/other/info3";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <StopBanner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/2page" element={<SecondPage />} />
          <Route path="/3page" element={<ThirdPage />} />
          <Route path="/4page" element={<FourPage />} />
          <Route path="/5page" element={<FivePage />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/info1" element={<Info1 />} />
          <Route path="/info2" element={<Info2 />} />
          <Route path="/4_End" element={<End />} />
          <Route path="/info3" element={<Info3 />} />
          <Route path="/admin" element={<TotalAdmin />} />

        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);