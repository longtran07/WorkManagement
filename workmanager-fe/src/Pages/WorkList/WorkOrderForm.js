import React, { useState, useEffect } from 'react';
import { fetchWorkTypes, fetchItemsByCategoryCode } from '../../services/api-service/WorkConfigService';

const WorkOrderForm = ({ formData, onChange, isEdit }) => {
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
          <label className="custom-label">Mã công việc <span className="required">*</span></label>
          <input
            type="text"
            className="custom-input"
            name="woCode"
            value={formData.woCode || ''}
            onChange={onChange}
            required
            placeholder="Nhập mã công việc"
            disabled={isEdit} // Disable when editing
          />
        </div>
        <div className="form-group">
          <label className="custom-label">Loại công việc <span className="required">*</span></label>
          <select
            className="custom-select"
            name="woTypeId"
            value={formData.woTypeId || ''}
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
            value={formData.priorityId || ''}
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
          <label className="custom-label">Thời gian bắt đầu <span className="required">*</span></label>
          <input
            type="date"
            className="custom-input"
            name="startTime"
            value={formData.startTime || ''}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="custom-label">Thời gian kết thúc <span className="required">*</span></label>
          <input
            type="date"
            className="custom-input"
            name="endTime"
            value={formData.endTime || ''}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="custom-label">Trạng thái <span className="required">*</span></label>
          <select
            className="custom-select"
            name="status"
            value={formData.status || ''}
            onChange={onChange}
            required
          >
            <option value="">Chọn trạng thái</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="custom-label">Người thực hiện <span className="required">*</span></label>
          <input
            type="text"
            className="custom-input"
            name="assignUserId"
            value={formData.assignUserId || ''}
            onChange={onChange}
            required
            placeholder="Nhập người thực hiện"
          />
        </div>
        <div className="form-group">
          <label className="custom-label">Thêm file</label>
          <input
            type="file"
            className="custom-input"
            name="file"
            // onChange={onFileChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="custom-label">Mô tả công việc <span className="required">*</span></label>
          <textarea
            className="custom-input"
            name="woContent"
            value={formData.woContent || ''}
            onChange={onChange}
            required
            placeholder="Nhập mô tả công việc"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkOrderForm;