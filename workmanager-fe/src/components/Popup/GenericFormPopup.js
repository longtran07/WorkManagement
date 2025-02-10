import React from 'react';
import { LogOut } from 'lucide-react';
import './GenericFormPopup.css';

const GenericFormPopup = ({
  show,
  onClose,
  onSubmit,
  title,
  size = 'medium',
  children
}) => {
  if (!show) return null;

  return (
    <div className="custom-modal">
      <div className={`custom-modal-content custom-modal-${size}`}>
        <div className="custom-modal-header">
          <h3 className="custom-modal-title">{title}</h3>
          <LogOut size={20} onClick={onClose} className="close-icon" />
        </div>

        <form onSubmit={onSubmit}>
          <div className="custom-modal-body">
            {children}
          </div>

          <div className="custom-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-save">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericFormPopup;