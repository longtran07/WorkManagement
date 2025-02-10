import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import AppRoutes from './routers/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useLocation  } from 'react-router-dom';


const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {!isLoginPage && <Sidebar />}
      <div className={`main-content ${isLoginPage ? 'full-screen' : ''}`}>
        <AppRoutes />
      </div>
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}



// export default App;

// function App() {
//   return (
//     <BrowserRouter>

//       <div className="app">
//         <Sidebar />
//         <div className="main-content">
//           <AppRoutes />
//         </div>
//         <ToastContainer/>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;