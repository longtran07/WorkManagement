import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Trash2, Edit } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import WorkOrderPopup from './WorkOrderPopup';
import {
  fetchWorkOrders,
  addWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  deleteWorkOrdersBatch
} from '../../services/api-service/WorkOrderService';
import {
  fetchWorkTypes,
  fetchItemsByCategoryCode,
  fetchItemName
} from '../../services/api-service/WorkConfigService';

const WorkOrderManagement = () => {
  // State management
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    woCode: '',
    woContent: '',
    woTypeId: '',
    priorityId: '',
    status: '',
    startTime: '',
    endTime: '',
    assignUserId: ''
  });

  // Options for search form
  const [workTypes, setWorkTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [workOrderToDelete, setWorkOrderToDelete] = useState(null);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add/Edit workOrder state
  const [showPopup, setShowPopup] = useState(false);
  const [workOrderForm, setWorkOrderForm] = useState({
    woCode: '',
    woContent: '',
    woTypeId: '',
    priorityId: '',
    status: 'new',
    startTime: '',
    endTime: '',
    finishTime: '',
    assignUserId: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editWorkOrderId, setEditWorkOrderId] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'woCode', title: 'Mã công việc', width: '150px' },
    { key: 'woContent', title: 'Mô tả công việc' , width: '150px'},
    { key: 'woTypeName', title: 'Loại công việc' , width: '150px'},
    { key: 'priorityName', title: 'Mức độ ưu tiên' , width: '150px'},
    { key: 'statusName', title: 'Trạng thái' , width: '150px'},
    { key: 'startTime', title: 'Thời gian bắt đầu' , width: '150px'},
    { key: 'endTime', title: 'Thời gian kết thúc' , width: '150px'},
    { key: 'finishTime', title: 'Thời gian hoàn thành' , width: '150px'},
    { key: 'assignUserId', title: 'Người thực hiện', width: '150px' }
  ];


  // Data fetching
  const loadWorkOrders = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchWorkOrders(page, size, searchParams);
      const { workOrderResponses, totalPages, totalItems } = result;

      if (!workOrderResponses || workOrderResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setWorkOrders([]);
        return;
      }
      debugger

      const workOrdersWithNames = await Promise.all(workOrderResponses.map(async (workOrder) => {
        const woTypeName = await fetchItemName(workOrder.woTypeId);
        const priorityName = await fetchItemName(workOrder.priorityId);
        const statusName = await fetchItemName(workOrder.status);

        return {
          ...workOrder,
          woTypeName,
          priorityName,
          statusName
        };
      }));

      setWorkOrders(workOrdersWithNames);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadWorkOrders();
  }, [loadWorkOrders]);

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
      woCode: '',
      woContent: '',
      woTypeId: '',
      priorityId: '',
      status: '',
      startTime: '',
      endTime: '',
      assignUserId: ''
    });
    loadWorkOrders(1, pageSize);
  };

  const handleSearch = () => loadWorkOrders(1, pageSize, searchForm);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadWorkOrders(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    loadWorkOrders(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (workOrder) => {
    setWorkOrderToDelete(workOrder);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (workOrder) => {
    setWorkOrderForm({
      woCode: workOrder.woCode,
      woContent: workOrder.woContent,
      woTypeId: workOrder.woTypeId,
      priorityId: workOrder.priorityId,
      status: workOrder.status,
      startTime: workOrder.startTime,
      endTime: workOrder.endTime,
      finishTime: workOrder.finishTime || '',
      assignUserId: workOrder.assignUserId
    });
    setEditWorkOrderId(workOrder.id);
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedWorkOrders.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await deleteWorkOrder(workOrderToDelete.id);
      } else {
        await deleteWorkOrdersBatch(selectedWorkOrders);
      }

      Toast.success("Xóa thành công");
      loadWorkOrders(currentPage, pageSize, searchForm);
      setSelectedWorkOrders([]);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setWorkOrderToDelete(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setWorkOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWorkOrder = async (e) => {
    e.preventDefault();
    try {
      const { finishTime, ...rest } = workOrderForm;
      await addWorkOrder(rest);
      Toast.success("Thêm công việc thành công");
      setShowPopup(false);
      setWorkOrderForm({
        woCode: '',
        woContent: '',
        woTypeId: '',
        priorityId: '',
        status: 'new',
        startTime: '',
        endTime: '',
        finishTime: '',
        assignUserId: ''
      });
      loadWorkOrders(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateWorkOrder = async (e) => {
    e.preventDefault();
    try {
      await updateWorkOrder(editWorkOrderId, workOrderForm);
      Toast.success("Cập nhật công việc thành công");
      setShowPopup(false);
      setWorkOrderForm({
        woCode: '',
        woContent: '',
        woTypeId: '',
        priorityId: '',
        status: 'new',
        startTime: '',
        endTime: '',
        finishTime: '',
        assignUserId: ''
      });
      loadWorkOrders(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedWorkOrders(selectedIds);
  
  const handleSelectOne = (id, checked) => {
    setSelectedWorkOrders(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách công việc</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setWorkOrderForm({
                woCode: '',
                woContent: '',
                woTypeId: '',
                priorityId: '',
                status: 'new',
                startTime: '',
                endTime: '',
                finishTime: '',
                assignUserId: ''
              });
            }}
          >
            <Plus size={16} />
            Thêm công việc
          </button>
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedWorkOrders.length === 0}
          >
            <Trash2 size={16} />
            Xóa công việc {selectedWorkOrders.length > 0 && `(${selectedWorkOrders.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã công việc</label>
                <input
                  type="text"
                  className="form-control"
                  name="woCode"
                  value={searchForm.woCode}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mô tả công việc</label>
                <input
                  type="text"
                  className="form-control"
                  name="woContent"
                  value={searchForm.woContent}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Loại công việc</label>
                <select
                  className="form-select"
                  name="woTypeId"
                  value={searchForm.woTypeId}
                  onChange={handleSearchChange}
                >
                  <option value="">Tất cả</option>
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
                <label className="form-label">Mức độ ưu tiên</label>
                <select
                  className="form-select"
                  name="priorityId"
                  value={searchForm.priorityId}
                  onChange={handleSearchChange}
                >
                  <option value="">Tất cả</option>
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
                <label className="form-label">Trạng thái</label>
                <select
                  className="form-select"
                  name="status"
                  value={searchForm.status}
                  onChange={handleSearchChange}
                >
                  <option value="">Tất cả</option>
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
                <label className="form-label">Người thực hiện</label>
                <input
                  type="text"
                  className="form-control"
                  name="assignUserId"
                  value={searchForm.assignUserId}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Thời gian bắt đầu</label>
                <input
                  type="date"
                  className="form-control"
                  name="startTime"
                  value={searchForm.startTime}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Thời gian kết thúc</label>
                <input
                  type="date"
                  className="form-control"
                  name="endTime"
                  value={searchForm.endTime}
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
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={handleReset}
                >
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
            data={workOrders}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedWorkOrders}
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
            ? `"${workOrderToDelete?.woCode}"`
            : `${selectedWorkOrders.length} công việc`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <WorkOrderPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateWorkOrder : handleAddWorkOrder}
          formData={workOrderForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default WorkOrderManagement;