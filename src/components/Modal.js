// Modal.js

import React from 'react';
import './../styles/Modal.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
