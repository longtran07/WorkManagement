import httpClient from '../../configurations/httpClient';
import { departmentApi } from '../../services/api-service/api';


export const updateDepartment = async (id, departmentForm) => {
    const response = await httpClient.put(`${departmentApi}/${id}`, departmentForm);
    return response.data.result;
  };
  