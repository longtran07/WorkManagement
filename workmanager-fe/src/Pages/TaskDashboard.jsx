import React from 'react';

const TaskDashboard = () => {
  // Data mẫu
  const stats = [
    { title: 'Đang thực hiện', value: 45, icon: '⏳', bgColor: 'bg-primary' },
    { title: 'Hoàn thành', value: 30, icon: '✓', bgColor: 'bg-success' },
    { title: 'Quá hạn', value: 15, icon: '⚠', bgColor: 'bg-danger' },
    { title: 'Nhân viên', value: 24, icon: '👥', bgColor: 'bg-info' }
  ];

  // Tạo dữ liệu cho biểu đồ thanh ngang
  const departmentData = [
    { name: 'IT', value: 85 },
    { name: 'Marketing', value: 65 },
    { name: 'Kinh doanh', value: 75 },
    { name: 'Nhân sự', value: 45 }
  ];

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Dashboard Quản lý Công việc</h1>
            <div className="text-muted">
              {new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <div className={`rounded-circle p-3 ${stat.bgColor} bg-opacity-25`}>
                    <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        {/* Status Distribution */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Phân bố công việc theo trạng thái</h5>
              <div className="d-flex justify-content-around text-center">
                <div>
                  <div className="rounded-circle bg-primary bg-opacity-25 p-4 mb-2">
                    <h4 className="mb-0">50%</h4>
                  </div>
                  <p className="small">Đang thực hiện</p>
                </div>
                <div>
                  <div className="rounded-circle bg-success bg-opacity-25 p-4 mb-2">
                    <h4 className="mb-0">33%</h4>
                  </div>
                  <p className="small">Hoàn thành</p>
                </div>
                <div>
                  <div className="rounded-circle bg-danger bg-opacity-25 p-4 mb-2">
                    <h4 className="mb-0">17%</h4>
                  </div>
                  <p className="small">Quá hạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Tasks */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Công việc theo phòng ban</h5>
              {departmentData.map((dept, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{dept.name}</span>
                    <span>{dept.value}%</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${dept.value}%` }}
                      aria-valuenow={dept.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Xu hướng công việc tuần qua</h5>
              <div className="d-flex justify-content-between align-items-end" style={{ height: "200px" }}>
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => {
                  const height = [60, 80, 65, 90, 75, 55, 45][index];
                  return (
                    <div key={day} className="d-flex flex-column align-items-center" style={{ width: '12%' }}>
                      <div
                        className="bg-primary bg-opacity-75 rounded-top"
                        style={{ height: `${height}%`, width: '100%' }}
                      ></div>
                      <span className="small mt-2">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="row mt-4">
        <div className="col-12 text-center text-muted">
          <p>&copy; 2025 Quản Lý Công Việc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TaskDashboard;