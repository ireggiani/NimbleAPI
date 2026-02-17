import React from 'react';

const Input = ({ value, onChange, placeholder, className = '', type = "text", required = false }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`inset-border ${className}`}
      style={{
        width: '100%',
        fontSize: '12px',
        marginBottom: '10px'
      }}
    />
  );
};

export default Input;
