import axios from 'axios';

const BASE_URL = 'http://localhost:8801/common/api/v1/category';

export const getCategories = () => axios.get(BASE_URL);

export const addCategory = (category) => axios.post(BASE_URL, category);

export const deleteCategory = (id) => axios.delete(`${BASE_URL}/${id}`);

export const departmentApi='http://localhost:8762/common/api/v1/department';