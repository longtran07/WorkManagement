import httpClient from '../../configurations/httpClient';
import { categoryApi } from '../../services/api-service/api';

export const fetchCategories = async (page, size, searchParams) => {
  const params = new URLSearchParams({
    page: page - 1,
    size,
    ...(searchParams.categoryCode && { categoryCode: searchParams.categoryCode }),
    ...(searchParams.categoryName && { categoryName: searchParams.categoryName })
  });

  const response = await httpClient.get(`${categoryApi}/search?${params}`);
  return response.data.result;
};

export const addCategory = async (categoryForm) => {
  const response = await httpClient.post(categoryApi, categoryForm);
  return response.data.result;
};

export const updateCategory = async (id, categoryForm) => {
  const response = await httpClient.put(`${categoryApi}/${id}`, categoryForm);
  return response.data.result;
};

export const deleteCategory = async (categoryCode) => {
  const response = await httpClient.delete(`${categoryApi}/delete-by-category-code/${categoryCode}`);
  return response.data.result;
};

export const deleteCategoriesBatch = async (ids) => {
  const response = await httpClient.delete(`${categoryApi}/batch`, {
    data: { ids }
  });
  return response.data.result;
};