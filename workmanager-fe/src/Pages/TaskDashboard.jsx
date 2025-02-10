import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { Clock, CheckCircle, AlertCircle, Users, Calendar, TrendingUp } from 'lucide-react';

const TaskDashboard = () => {
  // Sample data - would come from API in real application
  const tasksByStatus = [
    { name: 'Đang thực hiện', value: 45, color: '#2196F3' },
    { name: 'Hoàn thành', value: 30, color: '#4CAF50' },
    { name: 'Quá hạn', value: 15, color: '#F44336' },
    { name: 'Chờ xử lý', value: 10, color: '#FFC107' }
  ];

  const taskTrend = [
    { name: 'T2', completed: 5, new: 8 },
    { name: 'T3', completed: 7, new: 6 },
    { name: 'T4', completed: 4, new: 9 },
    { name: 'T5', completed: 8, new: 5 },
    { name: 'T6', completed: 6, new: 7 },
    { name: 'T7', completed: 9, new: 4 },
    { name: 'CN', completed: 3, new: 6 }
  ];

  const workloadByDepartment = [
    { name: 'Marketing', tasks: 25 },
    { name: 'IT', tasks: 35 },
    { name: 'Sales', tasks: 20 },
    { name: 'HR', tasks: 15 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Quản lý Công việc</h1>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>{new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang thực hiện</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hoàn thành</p>
              <h3 className="text-2xl font-bold">30</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Quá hạn</p>
              <h3 className="text-2xl font-bold">15</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Nhân viên</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố công việc theo trạng thái</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={tasksByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {tasksByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng công việc tuần qua</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={taskTrend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#4CAF50" name="Hoàn thành" />
              <Line type="monotone" dataKey="new" stroke="#2196F3" name="Công việc mới" />
            </LineChart>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <Card>
        <CardHeader>
          <CardTitle>Công việc theo phòng ban</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={800} height={300} data={workloadByDepartment}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDashboard;