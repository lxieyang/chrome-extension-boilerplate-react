import React from 'react';
import { Rnd } from 'react-rnd';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
  initialWidth = 400,
  initialHeight = 300,
  initialX = 50,
  initialY = 50,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <Rnd
        default={{
          x: initialX,
          y: initialY,
          width: initialWidth,
          height: initialHeight,
        }}
        bounds="window"
        className="modal-rnd"
      >
        <div className="modal">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {children} {/* children에 SearchPopup 포함 */}
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default Modal;
