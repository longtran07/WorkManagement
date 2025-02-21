import { API } from '../../configurations/configuration';
import httpClient from '../../configurations/httpClient';


const departmentApi=API.DEPARTMENT;

export const updateDepartment = async (id, departmentForm) => {
    const response = await httpClient.put(`${departmentApi}/${id}`, departmentForm);
    return response.data.result;
  };
  

export const fetchDepartments = async (page, size, searchParams) => {
  const params = new URLSearchParams({
    page: page - 1,
    size,
    ...(searchParams.departmentCode && { departmentCode: searchParams.departmentCode }),
    ...(searchParams.departmentName && { departmentName: searchParams.departmentName })
  });

  const response = await httpClient.get(`${departmentApi}/search?${params}`);

  return response.data.result;
};

export const getAllDepartment = async () => {
  const response = await httpClient.get(departmentApi);
  return response.data.result;
};

export const addDepartment = async (departmentForm) => {
  const response = await httpClient.post(departmentApi, departmentForm);
  return response.data.result;
};


export const deleteDepartment = async (departmentCode) => {
  const response = await httpClient.delete(`${departmentApi}/delete-by-department-code/${departmentCode}`);
  return response.data.result;
};

export const deleteDepartmentsBatch = async (ids) => {
  const response = await httpClient.delete(`${departmentApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};