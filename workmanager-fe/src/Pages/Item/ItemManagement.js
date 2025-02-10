import React, { useState ,useEffect} from 'react';
import { Search, Plus, Trash2, Edit } from 'lucide-react';
import './ItemManagement.css';
import axios from 'axios';

const ItemManagement = () => {
  // State cho form tìm kiếm
  const [searchForm, setSearchForm] = useState({
    itemCode: '',
    itemName: '',
    itemValue: '',
    parentCategory: ''
  });

  // State cho danh sách items

  //   {
  //     id: 2,
  //     itemCode: 'I002',
  //     itemName: 'Sofa',
  //     itemValue: '300USD',
  //     parentCategory: 'Furniture',
  //     status: false
  //   }
  // ]);

    // State cho danh sách categories
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // Hàm fetch items từ API
  const fetchItems = async () => {
    try {
      debugger
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8801/common/api/v1/item');
      
      // Chuyển đổi dữ liệu từ API sang format phù hợp với component
      debugger
      const formattedItems = response.data.result.map((item, index) => ({
        id: index + 1, // Tạo id tạm thời
        itemCode: item.item_code || '',
        itemName: item.item_name || '',
        itemValue: item.item_value || '',
        parentCategory: item.category_code || '',
        status: item.status === 1
      }));
      
      setItems(formattedItems);
    } catch (err) {
      debugger
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

    // Gọi API khi component mount
    useEffect(() => {
      fetchItems();
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
      itemCode: '',
      itemName: '',
      itemValue: '',
      parentCategory: ''
    });
  };

  return (
    <div className="item-management">
      <div className="header">
        <h2>Danh sách mặt hàng</h2>
        <div className="actions">
          <button className="btn btn-primary">
            <Plus size={16} />
            Thêm hạng mục
          </button>
          <button className="btn btn-danger">
            <Trash2 size={16} />
            Xóa hạng mục
          </button>
        </div>
      </div>
      {/* Form tìm kiếm */}
      <div className="search-form">
        <div className="form-group">
          <label>Mã hạng mục</label>
          <input
            type="text"
            name="itemCode"
            value={searchForm.itemCode}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Tên hạng mục</label>
          <input
            type="text"
            name="itemName"
            value={searchForm.itemName}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Giá trị</label>
          <input
            type="text"
            name="itemValue"
            value={searchForm.itemValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group">
          <label>Danh mục cha</label>
          <input
            type="text"
            name="parentCategory"
            value={searchForm.parentCategory}
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

      {/* Bảng items */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>STT</th>
              <th>Hành động</th>
              <th>Mã hạng mục</th>
              <th>Tên hạng mục</th>
              <th>Giá trị</th>
              <th>Danh mục cha</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
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
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.itemValue}</td>
                <td>{item.parentCategory}</td>
                <td>
                  <span className={`status ${item.status ? 'active' : 'inactive'}`}>
                    {item.status ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <span>Tổng: 2 bản ghi</span>
        <div className="pagination-controls">
          <button className="btn-page active">1</button>
          {/* Các trang khác nếu có */}
        </div>
        <select>
          <option>20/trang</option>
        </select>
      </div>
    </div>
  );
};

export default ItemManagement;
