import React, { useState, useEffect } from 'react';
import { fetchWorkTypes, fetchItemsByCategoryCode } from '../../services/api-service/WorkConfigService';

const WorkConfigForm = ({ formData, onChange, isEdit }) => {
  const [workTypes, setWorkTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const workTypesData = await fetchWorkTypes();
      setWorkTypes(workTypesData);

      const prioritiesData = await fetchItemsByCategoryCode('WO_PRIORITY');
      setPriorities(prioritiesData);

      const statusesData = await fetchItemsByCategoryCode('WO_STATUS');
      setStatuses(statusesData);
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className="form-row">
      <div className="form-group">
        <label className="custom-label">Tên loại công việc <span className="required">*</span></label>
        <select
          className="custom-select"
          name="woTypeId"
          value={formData.woTypeId}
          onChange={onChange}
          required
        >
          <option value="">Chọn loại công việc</option>
          {workTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.woTypeName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="custom-label">Mức độ ưu tiên <span className="required">*</span></label>
        <select
          className="custom-select"
          name="priorityId"
          value={formData.priorityId}
          onChange={onChange}
          required
        >
          <option value="">Chọn mức độ ưu tiên</option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.itemName}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="form-row">
      <div className="form-group">
        <label className="custom-label">Trạng thái cũ <span className="required">*</span></label>
        <select
          className="custom-select"
          name="oldStatus"
          value={formData.oldStatus}
          onChange={onChange}
          required
        >
          <option value="">Chọn trạng thái cũ</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.itemName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="custom-label">Trạng thái mới <span className="required">*</span></label>
        <select
          className="custom-select"
          name="newStatus"
          value={formData.newStatus}
          onChange={onChange}
          required
        >
          <option value="">Chọn trạng thái mới</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.itemName}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
};

export default WorkConfigForm;