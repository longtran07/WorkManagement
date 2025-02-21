import React, { useState, useEffect } from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';
import { getListCategories } from '../../services/api-service/CategoryService';
import { fetchParentItems } from '../../services/api-service/ItemService';

const ItemForm = ({ formData, onChange, isEdit, categories, parentItems }) => (
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
          Hạng mục cha
          {/* <span className="required">*</span> */}
        </label>
        <select
          className="custom-select"
          name="parentItemId"
          value={formData.parentItemId}
          onChange={onChange}
        >
          <option value="">Hạng mục cha</option>
          {parentItems.map((item) => (
            <option key={item.id} value={item.itemCode}>
              {item.itemCode}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Mã danh mục
          <span className="required">*</span>
        </label>
        <select
          className="custom-select"
          name="categoryCode"
          value={formData.categoryCode}
          onChange={onChange}
          required
        >
          <option value="">Mã danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.categoryCode}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

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
  const [categories, setCategories] = useState([]);
  const [parentItems, setParentItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getListCategories();
      setCategories(categoriesData);

      const parentItemsData = await fetchParentItems();
      setParentItems(parentItemsData);
    };

    fetchData();
  }, []);

  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật hạng mục' : 'Thêm hạng mục'}
    >
      <ItemForm
        formData={formData}
        onChange={onChange}
        isEdit={isEdit}
        categories={categories}
        parentItems={parentItems}
      />
    </GenericFormPopup>
  );
};

export default AddItemPopup;