import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';

const workOrderApi = API.WORK_ORDER;

export const fetchWorkOrders = async (page, size, searchParams = {}) => {
  const requestBody = {
    ...searchParams,
    page: page - 1,
    size: size,
  };

  const response = await httpClient.post(
    `${workOrderApi}/search`,
    requestBody
  );
  return response.data.result;
};

export const addWorkOrder = async (workOrderForm) => {
  const response = await httpClient.post(workOrderApi, workOrderForm);
  return response.data.result;
};

export const updateWorkOrder = async (id, workOrderForm) => {
  const response = await httpClient.put(`${workOrderApi}/${id}`, workOrderForm);
  return response.data.result;
};

export const deleteWorkOrder = async (workOrderId) => {
  const response = await httpClient.delete(`${workOrderApi}/${workOrderId}`);
  return response.data.result;
};

export const deleteWorkOrdersBatch = async (ids) => {
  const response = await httpClient.delete(`${workOrderApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};

export const getWorkOrderById = async (id) => {
  const response = await httpClient.get(`${workOrderApi}/${id}`);
  return response.data.result;
};