import React, { useState, useEffect } from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';
import { getAllDepartment } from '../../services/api-service/DepartmentService';

const UserForm = ({ formData, onChange, isEdit, departments }) => (
  <div>
    <div className="form-row">
      <div className="form-group">
        <label className="custom-label">
          Tên tài khoản
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="username"
          value={formData.username || ''}
          onChange={onChange}
          required
          placeholder="Nhập tên tài khoản"
          disabled={isEdit} // Nếu cập nhật thì khóa lại
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Họ
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="lastName"
          value={formData.lastName || ''}
          onChange={onChange}
          required
          placeholder="Nhập họ"
        />
      </div>
    </div>
    <div className="form-row">

      <div className="form-group">
        <label className="custom-label">
          Tên
          <span className="required">*</span>
        </label>
        <input
          type="text"
          className="custom-input"
          name="firstName"
          value={formData.firstName || ''}
          onChange={onChange}
          required
          placeholder="Nhập tên"
        />
      </div>

      <div className="form-group">
        <label className="custom-label">
          Email
          <span className="required">*</span>
        </label>
        <input
          type="email"
          className="custom-input"
          name="email"
          value={formData.email || ''}
          onChange={onChange}
          required
          placeholder="Nhập email"
        />
      </div>
    </div>
    <div className="form-row">

      <div className="form-group">
        <label className="custom-label">
          Số điện thoại
          <span className="required">*</span>
        </label>
        <input
          type="tel"
          className="custom-input"
          name="phone"
          value={formData.phone || ''}
          onChange={onChange}
          required
          placeholder="Nhập số điện thoại"
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
    <div className="form-group">
      <label className="custom-label">
        Phòng ban
      </label>
      <select
        className="custom-select"
        name="departmentId"
        value={formData.departmentId || ''}
        onChange={onChange}
      >
        <option value="">Phòng ban</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.departmentName}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const UserPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await getAllDepartment();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật user' : 'Thêm user'}
    >
      <UserForm formData={formData} onChange={onChange} isEdit={isEdit} departments={departments} />
    </GenericFormPopup>
  );
};

export default UserPopup;