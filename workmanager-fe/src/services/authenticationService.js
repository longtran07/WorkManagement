import { getToken, removeToken, setToken } from "./localStorageService";
import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const logIn = async (username, password) => {
  try {
    const response = await httpClient.post(API.LOGIN, {
      username: username,
      password: password,
    });

    if (response.data?.status === "ACCEPTED") {
      const token = response.data?.result?.token;
      setToken(token);
      return { success: true, data: response.data?.result };
    } else {
      return { success: false, message: "Sai tài khoản hoặc mật khẩu!" };
    }
  } catch (error) {
    return { success: false, message: "Lỗi kết nối đến server!" };
  }
};



export const register = async (userData) => {
  try {
    debugger
    const response = await httpClient.post("http://localhost:8762/user-service/users/register", userData);
    debugger
    if (response.data?.message === "ACCEPTED") {
      return { success: true, message: "Đăng ký thành công!" };
    } else {
      return { success: false, message: response.data?.message || "Đăng ký thất bại!" };
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: "Lỗi kết nối đến server!" };
  }
};

export const logOut = (navigate) => {
  removeToken();
  navigate("/login"); // Chuyển về trang login
};


export const isAuthenticated = () => {
  return getToken();
};
