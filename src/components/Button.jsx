import React from 'react';

const Button = ({ children, onClick, disabled, className = '', type = "button" }) => {
  return (
    <button
      type={type}
      className={`button-border ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '2px 10px',
        minWidth: '75px',
        fontSize: '12px',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
