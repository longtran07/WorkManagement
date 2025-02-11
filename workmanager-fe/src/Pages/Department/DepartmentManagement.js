import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2 } from 'lucide-react';

import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import DepartmentPopup from './DepartmentPopup';
import { updateDepartment } from '../../services/api-service/DepartmentService';
import './DepartmentManagement.css';
import { departmentApi } from '../../services/api-service/api';
import httpClient from '../../configurations/httpClient';
import { getToken } from '../../services/localStorageService';

const DepartmentManagement = () => {
  // State management
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    departmentCode: '',
    departmentName: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

   // Add/Edit Department 
  const [showPopup, setShowPopup] = useState(false);
  const [DepartmentForm, setDepartmentForm] = useState({
    departmentCode: '',
    departmentName: '',
    parentDepartmentId: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editDepartmentId, setEditDepartmentId] = useState(null); // State để lưu ID của category đang edit
  


  // Table columns configuration
  const columns = [
    { key: 'departmentCode', title: 'Mã phòng ban' },
    { key: 'departmentName', title: 'Tên phòng ban' },
    { key: 'parentDepartmentId', title: 'Phòng ban cha' },
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
  const fetchDepartments = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page - 1,
        size,
        ...(searchParams.departmentCode && { departmentCode: searchParams.departmentCode }),
        ...(searchParams.departmentName && { departmentName: searchParams.departmentName })
      });
debugger
      const response = await httpClient.get(`${departmentApi}/search?${params}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });


      const { departmentResponses, totalPages, totalItems } = response.data.result;

      if (!departmentResponses || departmentResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setDepartments([]);
        return;
      }

      const formattedData = departmentResponses.map(item => ({
        id: item.departmentId,
        departmentCode: item.departmentCode || '',
        departmentName: item.departmentName || '',
        parentDepartmentId: item.parentDepartmentId || '',
        status: item.status === 1
      }));

      setDepartments(formattedData);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch departments error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Search handlers
  const handleSearch = () => fetchDepartments(1, pageSize, searchForm);
  
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({ ...prev, [name]: value }));
  };
  // Reset form tìm kiếm
  const handleReset = () => {
    setSearchForm({ 
      departmentCode: '', 
      departmentName: '' 
    });
    fetchDepartments(1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchDepartments(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchDepartments(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (department) => {
    setDepartmentToDelete(department);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (department) => {
    setDepartmentForm({
      departmentCode: department.departmentCode,
      departmentName: department.departmentName,
      parentDepartmentId:department.parentDepartmentId,
      status: department.status ? 1 : 0
    });
    setEditDepartmentId(department.id); // Gán ID của category đang edit
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedDepartments.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await httpClient.delete(
          `${departmentApi}/delete-by-department-code/${departmentToDelete.departmentCode}`
        );
      } else {
        await httpClient.delete(`${departmentApi}/batch`, {
          data: { ids: selectedDepartments }
        });
      }

      Toast.success("Xóa thành công");
      fetchDepartments(currentPage, pageSize, searchForm);
      setSelectedDepartments([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setDepartmentToDelete(null);
    }
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setDepartmentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      await httpClient.post(departmentApi, DepartmentForm);
      Toast.success("Thêm phòng ban thành công");
      setShowPopup(false);
      setDepartmentForm({
        departmentCode: '',
        departmentName: '',
        parentDepartmentId: '',
        status: 1
      });
      fetchDepartments(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment(editDepartmentId, DepartmentForm); // Gửi yêu cầu cập nhật với ID đúng
      Toast.success("Cập nhật danh mục thành công");
      setShowPopup(false);
      setDepartmentForm({
        departmentCode: '',
        departmentName: '',
        parentDepartmentId: '',
        status: 1
      });
      fetchDepartments(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };


  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedDepartments(selectedIds);
  
  const handleSelectOne = (id, checked) => {
    setSelectedDepartments(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách phòng ban</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setDepartmentForm({
                departmentCode: '',
                departmentName: '',
                parentDepartmentId: '',
                status: 1
              });
            }}
          >
            <UserPlus size={16} />
            Thêm phòng ban
          </button>
          <button 
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedDepartments.length === 0}
          >
            <Trash2 size={16} />
            Xóa phòng ban {selectedDepartments.length > 0 && `(${selectedDepartments.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã phòng ban</label>
                <input
                  type="text"
                  className="form-control"
                  name="departmentCode"
                  value={searchForm.departmentCode}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên phòng ban</label>
                <input
                  type="text"
                  className="form-control"
                  name="departmentName"
                  value={searchForm.departmentName}
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
        <div className="card-body">
          <DataTable
            columns={columns}
            data={departments}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedDepartments}
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
            ? `"${departmentToDelete?.departmentName}"` 
            : `${selectedDepartments.length} phòng ban`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <DepartmentPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateDepartment : handleAddDepartment}
          formData={DepartmentForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default DepartmentManagement;