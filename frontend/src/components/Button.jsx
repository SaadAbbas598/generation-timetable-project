import React from 'react';

const Button = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-black px-6 py-2 rounded-xl hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
