import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const userApi=API.USER;

export const fetchUsers = async (page, size, searchParams) => {

  const requestBody = {
    ...searchParams,
    page: page - 1, // API thường bắt đầu page từ 0
    size
  };

  const response = await httpClient.post(`${userApi}/search`,requestBody);
  return response.data.result;
};

export const addUser = async (userForm) => {
  const response = await httpClient.post(userApi, userForm);
  return response.data.result;
};

export const updateUser = async (id, userForm) => {
  debugger
  const response = await httpClient.put(`${userApi}/${id}`, userForm);
  return response.data.result;
};

export const deleteUser = async (userId) => {
  const response = await httpClient.delete(`${userApi}/${userId}`);
  return response.data.result;
};

export const deleteUsersBatch = async (ids) => {
  const response = await httpClient.delete(`${userApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};