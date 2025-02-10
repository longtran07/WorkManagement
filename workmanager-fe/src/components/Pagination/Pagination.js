import React from 'react';


const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50]
}) => {

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    onPageSizeChange(newSize);
    onPageChange(1); // Reset về trang đầu tiên khi thay đổi size
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    pages.push(
      <button
        key={1}
        className={`btn btn-outline-primary btn-page ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage > totalPages - 3) {
      startPage = Math.max(2, totalPages - 3);
    }
    if (currentPage < 4) {
      endPage = Math.min(totalPages - 1, 4);
    }

    if (startPage > 2) {
      pages.push(<span key="dots1" className="dots">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-outline-primary btn-page ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<span key="dots2" className="dots">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`btn btn-outline-primary btn-page ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>Tổng: {totalItems} bản ghi</div>
      <div className="d-flex align-items-center gap-3">
        <div className="pagination-controls">
          {renderPageNumbers()}
        </div>
        <select 
          className="form-select"
          style={{ width: 'auto' }}
          value={pageSize}
          onChange={handleSizeChange}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}/trang
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination ;