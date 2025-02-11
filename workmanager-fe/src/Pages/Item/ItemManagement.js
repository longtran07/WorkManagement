import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2 } from 'lucide-react';

import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import ItemPopup from './ItemPopup';
import './ItemManagement.css';
import { itemApi } from '../../services/api-service/api';
import httpClient from '../../configurations/httpClient';
import { getToken } from '../../services/localStorageService';
import { updateItem } from '../../services/api-service/ItemService';

const ItemManagement = () => {
  // State management
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    itemCode: '',
    itemName: '',
    itemValue: '',
    categoryCode: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add item state
  const [showPopup, setShowPopup] = useState(false);
  const [ItemForm, setItemForm] = useState({
    itemCode: '',
    itemName: '',
    itemValue: '',
    categoryCode: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null); // State để lưu ID của category đang edit
  

  // Table columns configuration
  const columns = [
    { key: 'itemCode', title: 'Mã hạng mục' },
    { key: 'itemName', title: 'Tên hạng mục' },
    { key: 'itemValue', title: 'Giá trị' },
    { key: 'categoryCode', title: 'Danh mục cha' },
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
  const fetchItems = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page - 1,
        size,
        ...(searchParams.itemCode && { itemCode: searchParams.itemCode }),
        ...(searchParams.itemName && { itemName: searchParams.itemName }),
        ...(searchParams.itemValue && { itemValue: searchParams.itemValue }),
        ...(searchParams.categoryCode && { categoryCode: searchParams.categoryCode })
      });

      const response = await httpClient.get(`${itemApi}/search?${params}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const { itemResponses, totalPages, totalItems } = response.data.result;

      if (!itemResponses || itemResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setItems([]);
        return;
      }

      const formattedData = itemResponses.map(item => ({
        id: item.itemId,
        itemCode: item.itemCode || '',
        itemName: item.itemName || '',
        itemValue: item.itemValue || '',
        categoryCode: item.categoryCode || '',
        status: item.status === 1
      }));

      setItems(formattedData);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch items error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Search handlers
  const handleSearch = () => fetchItems(1, pageSize, searchForm);
  
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSearchForm({
      itemCode: '',
      itemName: '',
      itemValue: '',
      categoryCode: ''
    });
    fetchItems(1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchItems(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchItems(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (item) => {
    setItemToDelete(item);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (item) => {
    setItemForm({
      itemCode: item.itemCode,
        itemName: item.itemName,
        itemValue: item.itemValue,
        categoryCode: item.categoryCode,
        status: item.status ? 1 : 0
    });
    setEditItemId(item.id); // Gán ID của category đang edit
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await httpClient.delete(
          `${itemApi}/delete-by-item-code/${itemToDelete.itemCode}`
        );
      } else {
        await httpClient.delete(`${itemApi}/batch`, {
          data: { ids: selectedItems }
        });
      }

      Toast.success("Xóa thành công");
      fetchItems(currentPage, pageSize, searchForm);
      setSelectedItems([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setItemToDelete(null);
    }
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({
       ...prev, [name]: value 
      }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await httpClient.post(itemApi, ItemForm);
      Toast.success("Thêm hạng mục thành công");
      setShowPopup(false);
      setItemForm({
        itemCode: '',
        itemName: '',
        itemValue: '',
        categoryCode: '',
        status: 1
      });
      fetchItems(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await updateItem(editItemId, ItemForm); // Gửi yêu cầu cập nhật với ID đúng
      Toast.success("Cập nhật danh mục thành công");
      setShowPopup(false);
      setItemForm({
        itemCode: '',
        itemName: '',
        itemValue: '',
        categoryCode: '',
        status: 1
      });
      fetchItems(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedItems(selectedIds);
  
  const handleSelectOne = (id, checked) => {
    setSelectedItems(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách hạng mục</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setEditItemId(false);
              setItemForm({
                itemCode: '',
                itemName: '',
                itemValue: '',
                categoryCode: '',
                status: 1
              });
            }}
          >
            <UserPlus size={16} />
            Thêm hạng mục
          </button>
          <button 
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            <Trash2 size={16} />
            Xóa hạng mục {selectedItems.length > 0 && `(${selectedItems.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã hạng mục</label>
                <input
                  type="text"
                  className="form-control"
                  name="itemCode"
                  value={searchForm.itemCode}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên hạng mục</label>
                <input
                  type="text"
                  className="form-control"
                  name="itemName"
                  value={searchForm.itemName}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Giá trị</label>
                <input
                  type="text"
                  className="form-control"
                  name="itemValue"
                  value={searchForm.itemValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Danh mục cha</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoryCode"
                  value={searchForm.categoryCode}
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
            data={items}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedItems}
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
            ? `"${itemToDelete?.itemName}"` 
            : `${selectedItems.length} hạng mục`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <ItemPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateItem : handleAddItem}
          formData={ItemForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default ItemManagement;