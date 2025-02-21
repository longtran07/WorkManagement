import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import Login from '../Pages/Login/Login';
import TaskDashboard from '../Pages/TaskDashboard';
import CategoryManagement from '../../src/Pages/Category/CategoryManagement'
import DepartmentManagement from '../Pages/Department/DepartmentManagement';
import UserManagement from '../Pages/User/UserManagement';
import ItemManagement from '../Pages/Item/ItemManagement';
import WorkOrderManagement from '../Pages/WorkList/WorkOrderManagement';
import WordTypeManagement from '../Pages/WorkType/WorkTypeManagement';
import Register from '../Pages/Register/Register';
import Profile from '../Pages/Profile/Profile';
import ChangePassword from '../Pages/ResetPassword/ChangePassword';
import WorkConfigManagement from '../Pages/WorkConfig/WorkConfigManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<TaskDashboard />} />
          <Route path="/categories" element={<CategoryManagement />} />
          <Route path="/departments" element={<DepartmentManagement />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/items" element={<ItemManagement />} />
          <Route path="/workOrder" element={<WorkOrderManagement />} />
          <Route path="/workType" element={<WordTypeManagement />} />
          <Route path="/workConfig" element={<WorkConfigManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;