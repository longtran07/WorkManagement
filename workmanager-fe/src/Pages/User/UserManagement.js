// src/components/UserManagement/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import './UserManagement.css';
import axios from 'axios';
import { getToken } from '../../services/localStorageService';

const UserManagement = () => {
  // State cho form tìm kiếm
  const [searchForm, setSearchForm] = useState({
    username: '',
    name: '',
    email: '',
    phone: ''
  });

  // State cho danh sách users

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch users từ API
  const fetchUsers = async () => {
    try {
      debugger
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8762/common/api/v1/users',{
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            });


      // Chuyển đổi dữ liệu từ API sang format phù hợp với component
      debugger
      const formattedUsers = response.data.result.map((item, index) => ({
        id: index + 1, // Tạo id tạm thời
        username: item.username || '',
        firstName: item.first_name || '',
        lastName: item.last_name || '',
        phone: item.phone_number || '',
        email: item.email || '',
        status: item.status === 1
      }));

      setUsers(formattedUsers);
    } catch (err) {
      debugger
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý thay đổi form tìm kiếm
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form tìm kiếm
  const handleReset = () => {
    setSearchForm({
      username: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="user-management">
      <div className="header">
        <h2>Danh sách user</h2>
        <div className="actions">
          <button className="btn btn-primary">
            <UserPlus size={16} />
            Thêm user
          </button>
          <button className="btn btn-danger">
            <Trash2 size={16} />
            Xóa user
          </button>
        </div>
      </div>

      {/* Form tìm kiếm */}
      <div className="search-form">
        <div className="form-group">
          <label>Tên tài khoản</label>
          <input
            type="text"
            name="username"
            value={searchForm.username}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            name="name"
            value={searchForm.name}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={searchForm.email}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={searchForm.phone}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={() => console.log('Tìm kiếm:', searchForm)}>
            <Search size={16} />
            Tìm kiếm
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {/* Hiển thị loading và error states */}
      {loading && <div className="loading">Đang tải dữ liệu...</div>}
      {error && <div className="error">{error}</div>}

      {/* Bảng users */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>STT</th>
              <th>Hành động</th>
              <th>Tên tài khoản</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td>{index + 1}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn-icon">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status ${user.status ? 'active' : 'inactive'}`}>
                    {user.status ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <span>Tổng: 100 bản ghi</span>
        <div className="pagination-controls">
          <button className="btn-page active">1</button>
          <button className="btn-page">2</button>
          <button className="btn-page">3</button>
          <button className="btn-page">4</button>
          <span>...</span>
          <button className="btn-page">40</button>
        </div>
        <select>
          <option>20/trang</option>
        </select>
      </div>
    </div>
  );
};

export default UserManagement;