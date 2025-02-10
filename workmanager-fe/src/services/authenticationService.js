import { getToken, removeToken, setToken } from "./localStorageService";
import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";

export const logIn = async (username, password) => {
  const response = await httpClient.post(API.LOGIN, {
    username: username,
    password: password,
  });
  debugger

  if (response.data?.status === "ACCEPTED") {
    const token = response.data?.result?.token;
    setToken(token);  // Gọi hàm setToken để lưu trữ token
  }
  setToken(response.data?.result?.token);

  return response;
};

export const logOut = () => {
  removeToken();
};

export const isAuthenticated = () => {
  return getToken();
};
