import httpClient from "../configurations/httpClient";
import { API } from "../configurations/configuration";
import { getToken } from "./localStorageService";

export const getMyInfo = async () => {
  return await httpClient.get(API.MY_INFO, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getAllUsers = async () => {
  return await httpClient.get(API.ALL_USERS, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
