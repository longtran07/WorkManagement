import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, Trash2 } from 'lucide-react';

import DataTable from '../../components/DataTable/DataTable';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Delete';
import CategoryPopup from './CategoryPopup';
import Toast from '../../components/Toast/Toast';
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteCategoriesBatch
} from '../../services/api-service/CategoryService';

const CategoryManagement = () => {
  // State cho danh sách categories
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // State cho form tìm kiếm
  const [searchForm, setSearchForm] = useState({
    categoryCode: '',
    categoryName: ''
  });

  // Delete state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [deleteMode, setDeleteMode] = useState('single');

  // Add/Edit category 
  const [showPopup, setShowPopup] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    categoryCode: '',
    categoryName: '',
    status: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null); // State để lưu ID của category đang edit

  // Table columns configuration
  const columns = [
    { key: 'categoryCode', title: 'Mã danh mục' },
    { key: 'categoryName', title: 'Tên danh mục' },
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

  const loadCategories = useCallback(async (page = 1, size = pageSize, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchCategories(page, size, searchParams);

      const { categoryResponses, totalPages, totalItems } = result;

      if (!categoryResponses || categoryResponses.length === 0) {
        Toast.error("Không tìm thấy bản ghi");
        setCategories([]);
        return;
      }

      const formattedData = categoryResponses.map(item => ({
        id: item.categoryId,
        categoryCode: item.categoryCode || '',
        categoryName: item.categoryName || '',
        status: item.status === 1
      }));

      setCategories(formattedData);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setCurrentPage(page);

    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Fetch categories error:', err);
      Toast.error(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");

    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Gọi API khi component mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Search handlers
  const handleSearch = () => loadCategories(1, pageSize, searchForm);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({ ...prev, [name]: value }));
  };

  // Reset form tìm kiếm
  const handleReset = () => {
    setSearchForm({
      categoryCode: '',
      categoryName: ''
    });
    loadCategories(1, pageSize);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadCategories(page, pageSize, searchForm);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    loadCategories(1, newSize, searchForm);
  };

  // CRUD operations
  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteMode('single');
    setShowDeletePopup(true);
  };

  const handleUpdate = (category) => {
    setCategoryForm({
      categoryCode: category.categoryCode,
      categoryName: category.categoryName,
      status: category.status ? 1 : 0
    });
    setEditCategoryId(category.id); // Gán ID của category đang edit
    setIsEdit(true);
    setShowPopup(true);
  };

  const handleDeleteSelected = () => {
    if (selectedCategories.length === 0) return;
    setDeleteMode('multiple');
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteMode === 'single') {
        await deleteCategory(categoryToDelete.categoryCode);
      } else {
        await deleteCategoriesBatch(selectedCategories);
      }

      Toast.success("Xóa thành công");
      loadCategories(currentPage, pageSize, searchForm);
      setSelectedCategories([]);
    } catch (error) {
      console.error('Delete error:', error);
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    } finally {
      setShowDeletePopup(false);
      setCategoryToDelete(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryForm);
      Toast.success("Thêm danh mục thành công");
      setShowPopup(false);
      setCategoryForm({
        categoryCode: '',
        categoryName: '',
        status: 1
      });
      loadCategories(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(editCategoryId, categoryForm); // Gửi yêu cầu cập nhật với ID đúng
      Toast.success("Cập nhật danh mục thành công");
      setShowPopup(false);
      setCategoryForm({
        categoryCode: '',
        categoryName: '',
        status: 1
      });
      loadCategories(currentPage, pageSize, searchForm);
    } catch (error) {
      Toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  // Selection handlers
  const handleSelectAll = (selectedIds) => setSelectedCategories(selectedIds);

  const handleSelectOne = (id, checked) => {
    setSelectedCategories(prev => checked 
      ? [...prev, id] 
      : prev.filter(itemId => itemId !== id)
    );
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách danh mục</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setShowPopup(true);
              setIsEdit(false);
              setCategoryForm({
                categoryCode: '',
                categoryName: '',
                status: 1
              });
            }}
          >
            <UserPlus size={16} />
            Thêm danh mục
          </button>
          <button 
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDeleteSelected}
            disabled={selectedCategories.length === 0}
          >
            <Trash2 size={16} />
            Xóa danh mục {selectedCategories.length > 0 && `(${selectedCategories.length})`}
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Mã danh mục</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoryCode"
                  value={searchForm.categoryCode}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Tên danh mục</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoryName"
                  value={searchForm.categoryName}
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
            data={categories}
            currentPage={currentPage}
            pageSize={pageSize}
            selectable={true}
            selectedItems={selectedCategories}
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
            ? `"${categoryToDelete?.categoryName}"` 
            : `${selectedCategories.length} danh mục`} không?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      {showPopup && (
        <CategoryPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={isEdit ? handleUpdateCategory : handleAddCategory}
          formData={categoryForm}
          onChange={handleFormChange}
          isEdit={isEdit}
        />
      )}

    </div>
  );
};

export default CategoryManagement;