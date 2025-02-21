import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';

const WorkTypeForm = ({ formData, onChange, isEdit }) => (
  <div>
    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Mã loại công việc
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="woTypeCode"
          value={formData.woTypeCode || ''}
          onChange={onChange}
          required
          placeholder="Nhập mã loại công việc"
          disabled={isEdit} // Disable during edit
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Tên loại công việc
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="woTypeName"
          value={formData.woTypeName || ''}
          onChange={onChange}
          required
          placeholder="Nhập tên loại công việc"
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Ưu tiên
        </label>
        <input
          type="text"
          className="custom-input"
          name="priorityId"
          value={formData.priorityId || ''}
          onChange={onChange}
          placeholder="Nhập mã ưu tiên"
        />
      </div>
      
      <div className="form-group">
        <label className="custom-label">
          Trạng thái
        </label>
        <select
          className="custom-select"
          name="status"
          value={formData.status || 1}
          onChange={onChange}
        >
          <option value={1}>Đang hoạt động</option>
          <option value={0}>Không hoạt động</option>
        </select>
      </div>
    </div>
  </div>
);

const WorkTypePopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật loại công việc' : 'Thêm loại công việc'}
    >
      <WorkTypeForm formData={formData} onChange={onChange} isEdit={isEdit} />
    </GenericFormPopup>
  );
};

export default WorkTypePopup;