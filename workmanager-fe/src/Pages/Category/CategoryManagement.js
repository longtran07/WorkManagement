import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Edit } from 'lucide-react';
import './CategoryManagement.css';
import { getCategories } from '../../services/api-service/api';

const CategoryManagement = () => {
  // State cho form tìm kiếm
  const [searchForm, setSearchForm] = useState({
    categoryCode: '',
    categoryName: ''
  });

  // State cho danh sách categories
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch categories từ API
  const fetchCategories = async () => {
    try {
      debugger
      setLoading(true);
      setError(null);
      const response = await getCategories();

      // Chuyển đổi dữ liệu từ API sang format phù hợp với component
      debugger
      const formattedCategories = response.data.result.map((item, index) => ({
        id: index + 1, // Tạo id tạm thời
        categoryCode: item.category_code || '',
        categoryName: item.category_name || '',
        status: item.status === 1
      }));

      setCategories(formattedCategories);
    } catch (err) {
      debugger
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchCategories();
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
      categoryCode: '',
      categoryName: ''
    });
  };

  return (
    <div className="category-management">
      <div className="header">
        <h2>Danh sách danh mục</h2>
        <div className="actions">
          <button className="btn btn-primary">
            <Plus size={16} />
            Thêm danh mục
          </button>
          <button className="btn btn-danger">
            <Trash2 size={16} />
            Xóa danh mục
          </button>
        </div>
      </div>

      {/* Form tìm kiếm */}
      <div className="search-form">
        <div className="form-group">
          <label>Mã danh mục</label>
          <input
            type="text"
            name="categoryCode"
            value={searchForm.categoryCode}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Tên danh mục</label>
          <input
            type="text"
            name="categoryName"
            value={searchForm.categoryName}
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

      {/* Bảng category */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>STT</th>
              <th>Hành động</th>
              <th>Mã danh mục</th>
              <th>Tên danh mục</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
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
                <td>{category.categoryCode}</td>
                <td>{category.categoryName}</td>
                <td>
                  <span className={`status ${category.status ? 'active' : 'inactive'}`}>
                    {category.status ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <span>Tổng: {categories.length} bản ghi</span>
        <div className="pagination-controls">
          <button className="btn-page active">1</button>
        </div>
        <select>
          <option>20/trang</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryManagement;