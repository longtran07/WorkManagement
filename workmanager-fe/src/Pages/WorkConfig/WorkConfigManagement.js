import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import WorkConfigPopup from './WorkConfigPopup';
import {
  fetchWorkConfigs,
  addWorkConfig,
  updateWorkConfig,
  deleteWorkConfig,
  deleteWorkConfigsBatch,
  fetchWorkTypeName,
  fetchItemName,
  fetchWorkTypes,
  fetchItemsByCategoryCode
} from '../../services/api-service/WorkConfigService';

const WorkConfigManagement = () => {
  // State management
  const [workConfigs, setWorkConfigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    woTypeId: '',
    priorityId: '',
    oldStatus: '',
    newStatus: ''
  });

  // Options for search form
  const [workTypes, setWorkTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [workConfigToDelete, setWorkConfigToDelete] = useState(null);
  const [selectedWorkConfigs, setSelectedWorkConfigs] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add/Edit workConfig state
  const [showPopup, setShowPopup] = useState(false);
  const [workConfigForm, setWorkConfigForm] = useState({
    woTypeId: '',
    priorityId: '',
    oldStatus: '',
    newStatus: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editWorkConfigId, setEditWorkConfigId] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'woTypeName', title: 'Loại công việc' },
    { key: 'priorityName', title: 'Mức độ ưu tiên' },
    { key: 'oldStatusName', title: 'Trạng thái cũ' },
    { key: 'newStatusName', title: 'Trạng thái mới' }
  ];

  // Data fetching
  const loadWorkConfigs = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchWorkConfigs(page, size, searchParams);

      const { workConfigResponses, totalPages, totalItems } = result;

      if (!workConfigResponses || workConfigResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setWorkConfigs([]);
        return;
      }

      // Fetch additional data for work config names
      const workConfigsWithNames = await Promise.all(workConfigResponses.map(async (workConfig) => {
        const woTypeName = await fetchWorkTypeName(workConfig.woTypeId);
        const priorityName = await fetchItemName(workConfig.priorityId);
        const oldStatusName = await fetchItemName(workConfig.oldStatus);
        const newStatusName = await fetchItemName(workConfig.newStatus);

        return {
          ...workConfig,
          woTypeName,
          priorityName,
          oldStatusName,
          newStatusName
        };
      }));

      setWorkConfigs(workConfigsWithNames);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);

    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch workConfigs error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");

    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadWorkConfigs();
  }, [loadWorkConfigs]);

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
      woTypeId: '',
      priorityId: '',
      oldStatus: '',
      newStatus: ''
    });
    loadWorkConfigs(1, pageSize);
  };

  const handleSearch = () => loadWorkConfigs(1, pageSize, searchForm);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadWorkConfigs(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    loadWorkConfigs(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (workConfig) => {
    setWorkConfigToDelete(workConfig);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (workConfig) => {
    setWorkConfigForm({
      woTypeId: workConfig.woTypeId,
      priorityId: workConfig.priorityId,
      oldStatus: workConfig.oldStatus,
      newStatus: workConfig.newStatus
    });
    setEditWorkConfigId(workConfig.id); 
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedWorkConfigs.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await deleteWorkConfig(workConfigToDelete.id);
      } else {
        await deleteWorkConfigsBatch(selectedWorkConfigs);
      }

      Toast.success("Xóa thành công");
      loadWorkConfigs(currentPage, pageSize, searchForm);
      setSelectedWorkConfigs([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setWorkConfigToDelete(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setWorkConfigForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWorkConfig = async (e) => {
    e.preventDefault();
    try {
      await addWorkConfig(workConfigForm);
      Toast.success("Thêm cấu hình thành công");
      setShowPopup(false);
      setWorkConfigForm({
        woTypeId: '',
        priorityId: '',
        oldStatus: '',
        newStatus: ''
      });
      loadWorkConfigs(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateWorkConfig = async (e) => {
    e.preventDefault();
    try {
      await updateWorkConfig(editWorkConfigId, workConfigForm); 
      Toast.success("Cập nhật cấu hình thành công");
      setShowPopup(false);
      setWorkConfigForm({
        woTypeId: '',
        priorityId: '',
        oldStatus: '',
        newStatus: ''
      });
      loadWorkConfigs(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedWorkConfigs(selectedIds);

  const handleSelectOne = (id, checked) => {
    setSelectedWorkConfigs(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách cấu hình công việc</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setWorkConfigForm({
                woTypeId: '',
                priorityId: '',
                oldStatus: '',
                newStatus: ''
              });
            }}
          >
            <UserPlus size={16} />
            Thêm cấu hình công việc
          </button>
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedWorkConfigs.length === 0}
          >
            <Trash2 size={16} />
            Xóa cấu hình công việc {selectedWorkConfigs.length > 0 && `(${selectedWorkConfigs.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên loại công việc</label>
                <select
                  className="form-control"
                  name="woTypeId"
                  value={searchForm.woTypeId}
                  onChange={handleSearchChange}
                >
                  <option value="">Chọn loại công việc</option>
                  {workTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.woTypeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã ưu tiên</label>
                <select
                  className="form-control"
                  name="priorityId"
                  value={searchForm.priorityId}
                  onChange={handleSearchChange}
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
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Trạng thái cũ</label>
                <select
                  className="form-control"
                  name="oldStatus"
                  value={searchForm.oldStatus}
                  onChange={handleSearchChange}
                >
                  <option value="">Chọn trạng thái cũ</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.itemName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Trạng thái mới</label>
                <select
                  className="form-control"
                  name="newStatus"
                  value={searchForm.newStatus}
                  onChange={handleSearchChange}
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
        <div className="card-body">
          <DataTable
            columns={columns}
            data={workConfigs}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedWorkConfigs}
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
            ? `"${workConfigToDelete?.woTypeId}"`
            : `${selectedWorkConfigs.length} cấu hình công việc`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <WorkConfigPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateWorkConfig : handleAddWorkConfig}
          formData={workConfigForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default WorkConfigManagement;