import React from 'react';

const searchSectionStyles = {
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const searchContainerStyles = {
  flex: '1 1 320px',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #F39200 0%, #0066CC 100%)',
  borderRadius: '999px',
  padding: '2px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
};

const searchInputStyles = {
  flex: 1,
  border: 'none',
  borderRadius: '999px',
  padding: '14px 18px',
  outline: 'none',
  fontSize: '1rem',
  color: '#0F172A',
  backgroundColor: '#FFFFFF',
};

const searchIconStyles = {
  marginLeft: '16px',
  marginRight: '12px',
  fontSize: '1.1rem',
  color: '#0F172A',
};

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={searchSectionStyles}>
      <div style={searchContainerStyles}>
        <span style={searchIconStyles}>🔎</span>
        <input
          type="search"
          placeholder={placeholder || 'Rechercher...'}
          value={value}
          onChange={onChange}
          style={searchInputStyles}
        />
      </div>
    </div>
  );
}
