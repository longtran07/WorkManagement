import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const itemApi = API.ITEM;

export const fetchItems = async (page, size, searchParams) => {
  debugger
  const requestBody = {
    ...searchParams,
    page: page - 1, // API thường bắt đầu page từ 0
    size
  };
  const response = await httpClient.post(`${itemApi}/search`,requestBody);
  return response.data.result;
};


export const fetchParentItems = async () => {
  const response = await httpClient.get(`${API.ITEM}`);
  return response.data.result;
};

export const addItem = async (itemForm) => {
  const response = await httpClient.post(itemApi, itemForm);
  return response.data.result;
};

export const updateItem = async (id, itemForm) => {
  const response = await httpClient.put(`${itemApi}/${id}`, itemForm);
  return response.data.result;
};

export const deleteItem = async (itemCode) => {
  const response = await httpClient.delete(`${itemApi}/delete-by-item-code/${itemCode}`);
  return response.data.result;
};

export const deleteItemsBatch = async (ids) => {
  const response = await httpClient.delete(`${itemApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};