import axios from "axios";
import { CONFIG } from "./configuration";
import { getToken } from "../services/localStorageService";

const httpClient = axios.create({
  baseURL: CONFIG.API_GATEWAY,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Thêm token vào header của mỗi request
httpClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi 401 (Unauthorized)
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.clear(); // Xóa toàn bộ localStorage
      window.location.href = '/login'; // Chuyển về trang login
    }
    return Promise.reject(error);
  }
);

export default httpClient;