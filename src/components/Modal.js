import React from "react";
import { RiCloseFill } from "react-icons/ri";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500 hover:text-black"
        >
          <RiCloseFill />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
