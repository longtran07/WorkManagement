import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2 } from 'lucide-react';

import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import Toast from '../../components/Toast/Toast';
import ItemPopup from './ItemPopup';
import './ItemManagement.css';
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  deleteItemsBatch
} from '../../services/api-service/ItemService';
import { getListCategories } from '../../services/api-service/CategoryService';

const ItemManagement = () => {
  // State management
  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size to 10
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search state
  const [searchForm, setSearchForm] = useState({
    itemCode: '',
    itemName: '',
    categoryCode: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add/Edit Item state
  const [showPopup, setShowPopup] = useState(false);
  const [ItemForm, setItemForm] = useState({
    itemCode: '',
    itemName: '',
    itemValue: '',
    parentItemId:'',
    categoryCode: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null); // State to store the ID of the item being edited

  // Table columns configuration
  const columns = [
    { key: 'itemCode', title: 'Mã hạng mục' },
    { key: 'itemName', title: 'Tên hạng mục' },
    { key: 'itemValue', title: 'Giá trị' },
    { key: 'parentItemId', title: 'Hạng mục cha' },
    { key: 'categoryCode', title: 'Mã danh mục' },
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
  const fetchItemsData = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const { itemResponses, totalPages, totalItems } = await fetchItems(page, size, searchParams);

      if (!itemResponses || itemResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setItems([]);
        return;
      }

      const formattedData = itemResponses.map(item => ({
        itemId: item.itemId,
        itemCode: item.itemCode || '',
        itemName: item.itemName || '',
        itemValue: item.itemValue || '',
        parentItemId: item.parentItemId || '',
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
    debugger
    fetchItemsData();
    getListCategories().then(setCategories).catch(err => {
      setError('Có lỗi xảy ra khi tải danh mục');
      console.error('Fetch categories error:', err);
    });
  }, [fetchItemsData]);

  // Search handlers
  const handleSearch = () => fetchItemsData(1, pageSize, searchForm);
  
  const handleSearchChange = (e) => {
    
    const { name, value } = e.target;
    setSearchForm(prev => ({
       ...prev, [name]: value 

    }));
  };

  const handleReset = () => {
    setSearchForm({
      itemCode: '',
      itemName: '',
      categoryCode: ''
    });
    fetchItemsData(1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchItemsData(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchItemsData(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (item) => {
    setItemToDelete(item);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (item) => {
    debugger
    setItemForm({
      itemCode: item.itemCode,
      itemName: item.itemName,
      itemValue: item.itemValue,
      parentItemId: item.parentItemId,
      categoryCode: item.categoryCode,
      status: item.status ? 1 : 0
    });
    setEditItemId(item.itemId); // Set the ID of the item being edited
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
        await deleteItem(itemToDelete.itemCode);
      } else {
        await deleteItemsBatch(selectedItems);
      }

      Toast.success("Xóa thành công");
      fetchItemsData(currentPage, pageSize, searchForm);
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
    setItemForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addItem(ItemForm);
      Toast.success("Thêm hạng mục thành công");
      setShowPopup(false);
      setItemForm({
        itemCode: '',
        itemName: '',
        itemValue: '',
        parentItemId: '',
        categoryCode: '',
        status: 1
      });
      fetchItemsData(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await updateItem(editItemId, ItemForm); // Send the update request with the correct ID
      Toast.success("Cập nhật danh mục thành công");
      setShowPopup(false);
      setItemForm({
        itemCode: '',
        itemName: '',
        itemValue: '',
        parentItemId: '',
        categoryCode: '',
        status: 1
      });
      fetchItemsData(currentPage, pageSize, searchForm);
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
              setIsEdit(false);
              setItemForm({
                itemCode: '',
                itemName: '',
                itemValue: '',
                parentItemId: '',
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
                <label className="form-label">Mã danh mục</label>
                <select
                  className="custom-select"
                  name="categoryCode"
                  value={searchForm.categoryCode}
                  onChange={handleSearchChange}
                >
                  <option value=""></option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryCode}>
                      {category.categoryCode}
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
            data={items}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedItems}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onEdit={handleUpdate}
            onDelete={handleDelete}
            idField='itemId'
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