import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';

const CategoryForm = ({ formData, onChange, isEdit }) => (
  <div>
    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Mã danh mục
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="categoryCode"
          value={formData.categoryCode || ''}
          onChange={onChange}
          required
          placeholder="Nhập mã danh mục"
          disabled={isEdit} // Nếu cập nhật thì khóa lại
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Tên danh mục
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="categoryName"
          value={formData.categoryName || ''}
          onChange={onChange}
          required
          placeholder="Nhập tên danh mục"
        />
      </div>
    </div>

    <div className="form-row">
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

const CategoryPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật danh mục' : 'Thêm danh mục'}
    >
      <CategoryForm formData={formData} onChange={onChange} isEdit={isEdit} />
    </GenericFormPopup>
  );
};

export default CategoryPopup;
