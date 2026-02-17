import React from 'react';

const Window = ({ title, children, className = '' }) => {
  return (
    <div className={`window outset-border ${className}`}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button className="title-bar-button">_</button>
          <button className="title-bar-button">□</button>
          <button className="title-bar-button">×</button>
        </div>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  );
};

export default Window;
