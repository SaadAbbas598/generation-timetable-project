import React from 'react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl text-gray-400 hover:text-red-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
