import httpClient from '../../configurations/httpClient';
import { itemApi } from '../../services/api-service/api';


export const updateItem = async (id, itemForm) => {
    const response = await httpClient.put(`${itemApi}/${id}`, itemForm);
    return response.data.result;
  };
  