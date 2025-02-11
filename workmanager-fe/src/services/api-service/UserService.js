import httpClient from '../../configurations/httpClient';
import { userApi } from '../../services/api-service/api';

export const fetchUsers = async (page, size, searchParams) => {
  const params = new URLSearchParams({
    page: page - 1,
    size,
    ...(searchParams.username && { username: searchParams.username }),
    ...(searchParams.name && { name: searchParams.name }),
    ...(searchParams.email && { email: searchParams.email }),
    ...(searchParams.phone && { phone: searchParams.phone })
  });

  const response = await httpClient.get(`${userApi}/search?${params}`);
  return response.data.result;
};

export const addUser = async (userForm) => {
  const response = await httpClient.post(userApi, userForm);
  return response.data.result;
};

export const updateUser = async (id, userForm) => {
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