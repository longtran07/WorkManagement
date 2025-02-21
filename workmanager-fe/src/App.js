// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routers/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;