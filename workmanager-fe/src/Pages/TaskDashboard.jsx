import React from 'react';
import './TaskDashboard.css';

const TaskDashboard = () => {
  return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard Quản lý Công việc</h1>
          <div className="dashboard-date">
            {new Date().toLocaleDateString('vi-VN')}
          </div>
        </header>

        <main className="dashboard-main">
          <section className="dashboard-stats">
            <div className="stat-item">
              <h2>Đang thực hiện</h2>
              <p>45</p>
            </div>
            <div className="stat-item">
              <h2>Hoàn thành</h2>
              <p>30</p>
            </div>
            <div className="stat-item">
              <h2>Quá hạn</h2>
              <p>15</p>
            </div>
            <div className="stat-item">
              <h2>Nhân viên</h2>
              <p>24</p>
            </div>
          </section>

          <section className="dashboard-charts">
            <div className="chart-item">
              <h2>Phân bố công việc theo trạng thái</h2>
              <div className="chart-placeholder">[Biểu đồ tròn]</div>
            </div>
            <div className="chart-item">
              <h2>Xu hướng công việc tuần qua</h2>
              <div className="chart-placeholder">[Biểu đồ đường]</div>
            </div>
            <div className="chart-item">
              <h2>Công việc theo phòng ban</h2>
              <div className="chart-placeholder">[Biểu đồ cột]</div>
            </div>
          </section>
        </main>

        <footer className="dashboard-footer">
          <p>&copy; 2025 Quản Lý Công Việc</p>
        </footer>
      </div>
  );
}

export default TaskDashboard;