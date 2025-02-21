import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../services/authenticationService';

const ProtectedRoute = () => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return  <Outlet />;
};

export default ProtectedRoute;