import React from 'react';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '52px',
        zIndex: 100,
        backgroundColor: '#00A9A4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Paperlogy-4Regular',
          fontSize: '15px',
          lineHeight: '18px',
          color: 'white',
        }}
      >
        장애인 고용부담금 감면
      </span>
      <Link
        to="/survey"
        style={{
          fontFamily: 'Paperlogy-7Bold',
          fontSize: '20px',
          lineHeight: '20px',
          color: '#FFD400',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        지금 문의하기 <span style={{ color: 'white' }}>{`>`}</span>
      </Link>
    </div>
  );
};

export default MobileHeader;