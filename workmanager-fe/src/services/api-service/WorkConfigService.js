import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const workConfigApi = API.WORK_CONFIG;

export const fetchWorkConfigs = async (page, size, searchParams) => {
  const requestBody = {
    ...searchParams,
    page: page - 1, // API thường bắt đầu page từ 0
    size
  };

  const response = await httpClient.post(`${workConfigApi}/search`, requestBody);
  return response.data.result;
};

// Gọi API để lấy tên loại công việc từ ID
export const fetchWorkTypeName = async (id) => {
  const response = await httpClient.get(`${API.WORK_TYPE}/${id}`);
  return response.data.result.woTypeName;
};

// Gọi API để lấy tên item từ ID
export const fetchItemName = async (id) => {
  const response = await httpClient.get(`${API.ITEM}/${id}`);
  return response.data.result.itemName;
};

// Gọi API để lấy danh sách loại công việc
export const fetchWorkTypes = async () => {
  const response = await httpClient.get(`${API.WORK_TYPE}/listName`);
  return response.data.result;
};

// Gọi API để lấy danh sách item từ category code
export const fetchItemsByCategoryCode = async (categoryCode) => {
  const response = await httpClient.get(`${API.ITEM}/categoryCode`, {
    params: {
      categoryCode: categoryCode,
    },
  });
  return response.data.result;
};

export const addWorkConfig = async (workConfigForm) => {
  const response = await httpClient.post(workConfigApi, workConfigForm);
  return response.data.result;
};

export const updateWorkConfig = async (id, workConfigForm) => {
  const response = await httpClient.put(`${workConfigApi}/${id}`, workConfigForm);
  return response.data.result;
};

export const deleteWorkConfig = async (id) => {
  const response = await httpClient.delete(`${workConfigApi}/${id}`);
  return response.data.result;
};

export const deleteWorkConfigsBatch = async (ids) => {
  const response = await httpClient.delete(`${workConfigApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};