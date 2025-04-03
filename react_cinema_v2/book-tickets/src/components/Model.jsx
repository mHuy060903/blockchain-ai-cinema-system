/* eslint-disable react/prop-types */
// Modal.js
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, content }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-0 left-0 w-[300px]  h-full  bg-gray-200 transform transition-transform duration-500 ${
          showContent ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
