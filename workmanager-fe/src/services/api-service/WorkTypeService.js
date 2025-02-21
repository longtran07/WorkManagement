import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const workTypeApi=API.WORK_TYPE;

export const fetchWorkTypes = async (page, size, searchParams) => {
  debugger
  const requestBody = {
    ...searchParams,
    page: page - 1, // API thường bắt đầu page từ 0
    size
  };
  const response = await httpClient.post(`${API.WORK_TYPE}/search`, requestBody);

  return response.data.result;
};

export const addWorkType = async (workTypeForm) => {
  const response = await httpClient.post(workTypeApi, workTypeForm);
  return response.data.result;
};

export const updateWorkType = async (id, workTypeForm) => {
  const response = await httpClient.put(`${workTypeApi}/${id}`, workTypeForm);
  return response.data.result;
};

export const deleteWorkType = async (id) => {
  const response = await httpClient.delete(`${workTypeApi}/${id}`);
  return response.data.result;
};

export const deleteWorkTypesBatch = async (ids) => {
  const response = await httpClient.delete(`${workTypeApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};