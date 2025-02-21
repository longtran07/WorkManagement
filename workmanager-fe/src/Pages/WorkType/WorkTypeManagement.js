import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import WorkTypePopup from './WorkTypePopup';
import './WorkTypeManagement.css';
import {
  fetchWorkTypes,
  addWorkType,
  updateWorkType,
  deleteWorkType,
  deleteWorkTypesBatch
} from '../../services/api-service/WorkTypeService';

const WorkTypeManagement = () => {
  // State management
  const [workTypes, setWorkTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    woTypeCode: '',
    woTypeName: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [workTypeToDelete, setWorkTypeToDelete] = useState(null);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add/Edit workType state
  const [showPopup, setShowPopup] = useState(false);
  const [workTypeForm, setWorkTypeForm] = useState({
    woTypeCode: '',
    woTypeName: '',
    processTime: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editWorkTypeId, setEditWorkTypeId] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'woTypeCode', title: 'Mã loại công việc' },
    { key: 'woTypeName', title: 'Tên loại công việc' },
    { key: 'processTime', title: 'Thời gian xử lý' },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (value) => (
        <span className={`status ${value ? 'active' : 'inactive'}`}>
          {value ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    }
  ];

  // Data fetching
  const loadWorkTypes = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchWorkTypes(page, size, searchParams);

      const { workTypeResponse, totalPages, totalItems } = result;

      if (!workTypeResponse || workTypeResponse.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setWorkTypes([]);
        return;
      }

      const formattedWorkTypes = workTypeResponse.map((workType) => ({
        id: workType.id,
        woTypeCode: workType.woTypeCode || '',
        woTypeName: workType.woTypeName || '',
        processTime: workType.processTime || '',
        status: workType.status === 1
      }));

      setWorkTypes(formattedWorkTypes);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);

    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch workTypes error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");

    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadWorkTypes();
  }, [loadWorkTypes]);

  // Search handlers
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setSearchForm({
      woTypeCode: '',
      woTypeName: ''
    });
    loadWorkTypes(1, pageSize);
  };

  const handleSearch = () => loadWorkTypes(1, pageSize, searchForm);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadWorkTypes(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    loadWorkTypes(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (workType) => {
    setWorkTypeToDelete(workType);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (workType) => {
    setWorkTypeForm({
      woTypeCode: workType.woTypeCode,
      woTypeName: workType.woTypeName,
      processTime: workType.processTime,
      status: workType.status ? 1 : 0
    });
    setEditWorkTypeId(workType.id); 
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedWorkTypes.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await deleteWorkType(workTypeToDelete.id);
      } else {
        await deleteWorkTypesBatch(selectedWorkTypes);
      }

      Toast.success("Xóa thành công");
      loadWorkTypes(currentPage, pageSize, searchForm);
      setSelectedWorkTypes([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setWorkTypeToDelete(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setWorkTypeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWorkType = async (e) => {
    e.preventDefault();
    try {
      await addWorkType(workTypeForm);
      Toast.success("Thêm loại công việc thành công");
      setShowPopup(false);
      setWorkTypeForm({
        woTypeCode: '',
        woTypeName: '',
        processTime: '',
        status: 1
      });
      loadWorkTypes(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateWorkType = async (e) => {
    e.preventDefault();
    try {
      await updateWorkType(editWorkTypeId, workTypeForm); 
      Toast.success("Cập nhật loại công việc thành công");
      setShowPopup(false);
      setWorkTypeForm({
        woTypeCode: '',
        woTypeName: '',
        processTime: '',
        status: 1
      });
      loadWorkTypes(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedWorkTypes(selectedIds);

  const handleSelectOne = (id, checked) => {
    setSelectedWorkTypes(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách loại công việc</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setWorkTypeForm({
                woTypeCode: '',
                woTypeName: '',
                processTime: '',
                status: 1
              });
            }}
          >
            <UserPlus size={16} />
            Thêm loại công việc
          </button>
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedWorkTypes.length === 0}
          >
            <Trash2 size={16} />
            Xóa loại công việc {selectedWorkTypes.length > 0 && `(${selectedWorkTypes.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã loại công việc</label>
                <input
                  type="text"
                  className="form-control"
                  name="woTypeCode"
                  value={searchForm.woTypeCode}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên loại công việc</label>
                <input
                  type="text"
                  className="form-control"
                  name="woTypeName"
                  value={searchForm.woTypeName}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleSearch}
                >
                  <Search size={16} />
                  Tìm kiếm
                </button>
                <button className="btn btn-outline-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Data Table */}
      <div className="card">
        <div class="card-body">
          <DataTable
            columns={columns}
            data={workTypes}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedWorkTypes}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 20, 50]}
          />
        </div>
      </div>

      {/* Modals */}
      {showDeletePopup && (
        <Popup
          message={`Bạn có chắc chắn muốn xóa ${deleteMode === 'single'
            ? `"${workTypeToDelete?.woTypeCode}"`
            : `${selectedWorkTypes.length} loại công việc`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <WorkTypePopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateWorkType : handleAddWorkType}
          formData={workTypeForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default WorkTypeManagement;