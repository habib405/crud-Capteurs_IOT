import React from 'react';
import logo from '../../resources/image.png';

const headerStyles = {
  marginBottom: '24px',
  paddingBottom: '12px',
  borderBottom: '4px solid #F39200',
};

const brandBlockStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const brandLogoStyles = {
  display: 'block',
  paddingRight: '12px',
};

const brandTitleStyles = {
  fontSize: '2rem',
  fontWeight: 700,
  margin: 0,
  color: '#0F172A',
};

const brandSubtitleStyles = {
  margin: 0,
  color: '#475569',
  fontSize: '0.95rem',
};

export default function Header() {
  return (
    <header style={headerStyles}>
      <div style={brandBlockStyles}>
        <div style={brandLogoStyles}>
          <img src={logo} alt="Logo" style={{ display: 'block', maxWidth: 'none', height: 'auto' }} />
        </div>
        <div>
          <h1 style={brandTitleStyles}>Supervision des capteurs connectés CRUD </h1>
          <p style={brandSubtitleStyles}></p>
        </div>
      </div>
    </header>
  );
}
