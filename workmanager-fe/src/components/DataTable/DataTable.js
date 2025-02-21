import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  currentPage,
  pageSize,
  selectable = false,
  actions = true,
  selectedItems = [],
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  idField = 'id'
}) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }
    return item[column.key];
  };

  const handleSelectAll = (e) => {
    if (onSelectAll) {
      const selected = e.target.checked ? data.map(item => item[idField]) : [];
      onSelectAll(selected);
    }
  };

  const handleSelectOne = (item, e) => {
    if (onSelectOne) {
      const isSelected = e.target.checked;
      onSelectOne(item[idField], isSelected);
    }
  };

  const isSelected = (item) => {
    return selectedItems.includes(item[idField]);
  };

  const renderActions = (item) => {
    if (!actions) return null;
    return (
      <div className="d-flex gap-2">
        {onEdit && (
          <button 
            className="btn-icon"
            onClick={() => onEdit(item)}
            title="Sửa"
          >
            <Edit size={16} />
          </button>
        )}
        {onDelete && (
          <button 
            className="btn-icon"
            onClick={() => onDelete(item)}
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            {selectable && (
              <th>
                <input 
                  type="checkbox"
                  className="form-check-input"
                  checked={data.length > 0 && selectedItems.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            <th>STT</th>
            {actions && <th>Hành động</th>}
            {columns.map((column) => (
              <th key={column.key} style={{ minWidth: column.width || '150px' }}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item[idField]}>
              {selectable && (
                <td>
                  <input 
                    type="checkbox"
                    className="form-check-input"
                    checked={isSelected(item)}
                    onChange={(e) => handleSelectOne(item, e)}
                  />
                </td>
              )}
              <td>{((currentPage - 1) * pageSize) + index + 1}</td>
              {actions && <td>{renderActions(item)}</td>}
              {columns.map((column) => (
                <td key={column.key} style={{ minWidth: column.width || '150px' }}>{renderCell(item, column)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;