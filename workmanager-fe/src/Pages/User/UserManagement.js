import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import UserPopup from './UserPopup';
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteUsersBatch
} from '../../services/api-service/UserService';

const UserManagement = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    username: '',
    name: '',
    email: '',
    phone: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add user state
  const [showPopup, setShowPopup] = useState(false);
  const [userForm, setUserForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // Table columns configuration
  const columns = [
    { key: 'username', title: 'Tên tài khoản' },
    { key: 'lastName', title: 'Họ' },
    { key: 'firstName', title: 'Tên' },
    { key: 'phone', title: 'Số điện thoại' },
    { key: 'email', title: 'Email' },
    { key: 'departmentName', title: 'Phòng ban' },
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
  const loadUsers = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchUsers(page, size, searchParams);

      const { userResponses, totalPages, totalItems } = result;

      if (!userResponses || userResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setUsers([]);
        return;
      }

      const formattedUsers = userResponses.map((user) => ({
        id: user.userId,
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phoneNumber || '',
        email: user.email || '',
        departmentName: user.departmentName || '',
        status: user.status === 1
      }));

      setUsers(formattedUsers);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);

    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch users error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");

    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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
      username: '',
      name: '',
      email: '',
      phone: ''
    });
    loadUsers(1, pageSize);
  };

  const handleSearch = () => loadUsers(1, pageSize, searchForm);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadUsers(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    loadUsers(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (user) => {
    debugger
    setUserForm({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      status: user.status ? 1 : 0
    });
    setEditUserId(user.id); 
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    
    try {
      if (deleteMode === 'single') {
        await deleteUser(userToDelete.id);
      } else {
        await deleteUsersBatch(selectedUsers);
      }

      Toast.success("Xóa thành công");
      loadUsers(currentPage, pageSize, searchForm);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setUserToDelete(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(userForm);
      Toast.success("Thêm user thành công");
      setShowPopup(false);
      setUserForm({
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        status: 1
      });
      loadUsers(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateUser = async (e) => {
    debugger
    e.preventDefault();
    try {
      await updateUser(editUserId, userForm); 
      Toast.success("Cập nhật user thành công");
      setShowPopup(false);
      setUserForm({
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        status: 1
      });
      loadUsers(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedUsers(selectedIds);

  const handleSelectOne = (id, checked) => {
    setSelectedUsers(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách user</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setUserForm({
                username: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                status: 1
              });
            }}
          >
            <UserPlus size={16} />
            Thêm user
          </button>
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedUsers.length === 0}
          >
            <Trash2 size={16} />
            Xóa user {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={searchForm.username}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={searchForm.name}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={searchForm.email}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={searchForm.phone}
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
            data={users}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedUsers}
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
            ? `"${userToDelete?.username}"`
            : `${selectedUsers.length} user`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <UserPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateUser : handleAddUser}
          formData={userForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default UserManagement;