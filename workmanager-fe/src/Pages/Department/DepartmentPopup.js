import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';

const DepartmentForm = ({ formData, onChange, isEdit }) => (
  <div>
    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Mã phòng ban
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="departmentCode"
          value={formData.departmentCod || ''}
          onChange={onChange}
          required
          placeholder="Nhập mã phòng ban"
          disabled={isEdit} // Nếu cập nhật thì khóa lại
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Tên phòng ban
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="departmentName"
          value={formData.departmentName || ''}
          onChange={onChange}
          required
          placeholder="Nhập tên phòng ban"
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Phòng ban cha
        </label>
        <select
          className="custom-select"
          name="parentDepartmentId"
          value={formData.parentDepartmentId || ''}
          onChange={onChange}
        >
          <option value="">Chọn phòng ban</option>
        </select>
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

const AddDepartmentPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật phòng ban' : 'Thêm phòng ban'}
    >
      <DepartmentForm formData={formData} onChange={onChange} isEdit={isEdit} />
    </GenericFormPopup>
  );
};

export default AddDepartmentPopup;