import httpClient from "../../configurations/httpClient";
import { API } from "../../configurations/configuration";
import { getToken } from "../localStorageService";
import { jwtDecode } from 'jwt-decode';


export const getUserInfoByUsername = async () => {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: "Token không tồn tại!" };
    }

    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;

    const API_USER_INFO = `${API.USER}/username/${username}`;
    const response = await httpClient.get(API_USER_INFO);

    if (response.data?.message === "Success") {
      return { success: true, data: response.data?.result };
    } else {
      return { success: false, message: "Không thể lấy thông tin người dùng!" };
    }
  } catch (error) {
    
    return { success: false, message: "Lỗi kết nối đến server!" };
  }
};

export const updateUserInfo = async (userInfo) => {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: 'Token không tồn tại!' };
    }

    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;

    const response = await httpClient.put(`${API.USER}/detail/${username}`, {
      ...userInfo
    });

    if (response.data?.message === 'Success') {
      return { success: true };
    } else {
      return { success: false, message: 'Không thể cập nhật thông tin người dùng!' };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối đến server!' };
  }
};

export const getAddressByUserId = async (userId) => {
  try {
    const response = await httpClient.get(`${API.ADDRESS}/${userId}`);

    if (response.data?.status === 'OK') {
      return { success: true, data: response.data?.result };
    } else {
      return { success: false, message: 'Không thể lấy thông tin địa chỉ!' };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối đến server!' };
  }
};

export const updateAddress = async (address) => {
  try {
    const response = await httpClient.put(`${API.ADDRESS}`, address);

    if (response.data?.status === 'OK') {
      return { success: true };
    } else {
      return { success: false, message: 'Không thể cập nhật địa chỉ!' };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối đến server!' };
  }
};

export const addAddress = async (address) => {
  try {
    const response = await httpClient.post(`${API.ADDRESS}`, address);

    if (response.data?.status === 'CREATED') {
      return { success: true };
    } else {
      return { success: false, message: 'Không thể thêm địa chỉ!' };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối đến server!' };
  }
};
