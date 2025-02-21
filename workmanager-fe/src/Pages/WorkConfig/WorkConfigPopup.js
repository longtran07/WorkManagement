import React from 'react';
import GenericFormPopup from '../../components/Popup/GenericFormPopup';
import WorkConfigForm from './WorkConfigForm';

const WorkConfigPopup = ({ show, onClose, onSubmit, formData, onChange, isEdit }) => {
  return (
    <GenericFormPopup
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      title={isEdit ? 'Cập nhật cấu hình công việc' : 'Thêm cấu hình công việc'}
    >
      <WorkConfigForm formData={formData} onChange={onChange} isEdit={isEdit} />
    </GenericFormPopup>
  );
};

export default WorkConfigPopup;