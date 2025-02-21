import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';
import WorkOrderForm from './WorkOrderForm';

const WorkOrderPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật công việc' : 'Thêm công việc'}
    >
      <WorkOrderForm formData={formData} onChange={onChange} isEdit={isEdit} />
    </GenericFormPopup>
  );
};

export default WorkOrderPopup;