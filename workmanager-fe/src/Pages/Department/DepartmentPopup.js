import React, { useState, useEffect } from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';
import { getAllDepartment } from '../../services/api-service/DepartmentService';

const DepartmentForm = ({ formData, onChange, isEdit, departments }) => (
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
          value={formData.departmentCode || ''}
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
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.departmentName}
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

const DepartmentPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentData = await getAllDepartment();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật phòng ban' : 'Thêm phòng ban'}
    >
      <DepartmentForm formData={formData} onChange={onChange} isEdit={isEdit} departments={departments} />
    </GenericFormPopup>
  );
};

export default DepartmentPopup;