import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';

const ItemForm = ({ formData, onChange, isEdit }) => (
  <div>
    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Mã hạng mục
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="itemCode"
          value={formData.itemCode}
          onChange={onChange}
          required
          placeholder="Nhập mã hạng mục"
          disabled={isEdit}
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Tên hạng mục
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="itemName"
          value={formData.itemName}
          onChange={onChange}
          required
          placeholder="Nhập tên hạng mục"
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Giá trị
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="itemValue"
          value={formData.itemValue}
          onChange={onChange}
          required
          placeholder="Nhập giá trị"
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Danh mục cha
          <span className="required">*</span>
        </label>
        <select
          className="custom-select"
          name="parentCategory"
          value={formData.parentCategory}
          onChange={onChange}
          required
        >
          <option value="">Chọn danh mục</option>
          {/* Các options sẽ được thêm từ API categories */}
        </select>
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
          value={formData.status}
          onChange={onChange}
        >
          <option value={1}>Đang hoạt động</option>
          <option value={0}>Không hoạt động</option>
        </select>
      </div>
    </div>
  </div>
);

const AddItemPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật hạng mục' : 'Thêm hạng mục'}
    >
      <ItemForm formData={formData} onChange={onChange} isEdit={isEdit}/>
    </GenericFormPopup>
  );
};

export default AddItemPopup;