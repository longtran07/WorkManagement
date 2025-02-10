import React from 'react';
import './Delete.css';

const Popup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-inner">
        <h5>{message}</h5>
        <div className="popup-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>Có</button>
          <button className="btn btn-secondary" onClick={onCancel}>Không</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
