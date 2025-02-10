import { toast } from 'react-toastify';

const Toast = {
  success: (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#198754", // màu xanh success của Bootstrap
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        fontWeight: "500"
      }
    });
  },

  error: (message) => {
    toast.error(message, {
      position: "bottom-right", 
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#ff4444",
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        fontWeight: "500"
      }
    });
  }
};

export default Toast;