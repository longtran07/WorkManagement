// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryManagement from '../Pages/Category/CategoryManagement';
import DepartmentManagement from '../Pages/Department/DepartmentManagement';
import UserManagement from '../Pages/User/UserManagement';
import ItemManagement from '../Pages/Item/ItemManagement';
import Login from '../Pages/Login/Login';
import {Navigate  } from 'react-router-dom';
import TestReactJs from '../Pages/Test';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/categories" element={<CategoryManagement />} />
      <Route path="/user" element={<UserManagement />} />
      <Route path="/items" element={<ItemManagement />} />
      <Route path="/departments" element={<DepartmentManagement />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/test" element={<TestReactJs/>} />
    </Routes>
  );
};
export default AppRoutes;
