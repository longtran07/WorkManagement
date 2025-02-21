import { User } from "lucide-react";

export const CONFIG = {
  API_GATEWAY: "http://localhost:8762",
};
export const SERVICE_NAME = {
  COMMON:"common/api/v1",
  WFM:"work/api/v1",
  AUTH:"user/api/v1"

}

export const API = {
  DEPARTMENT:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.COMMON}/department`,
  CATEGORY:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.COMMON}/category`,
  ITEM:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.COMMON}/item`,
  USER:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.COMMON}/users`,
  ADDRESS:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.COMMON}/address`,
  WORK_ORDER:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.WFM}/workOrder`,
  WORK_TYPE:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.WFM}/workType`,
  WORK_CONFIG:`${CONFIG.API_GATEWAY}/${SERVICE_NAME.WFM}/workConfig`,
  LOGIN: "/user-service/auth/token",
  ALL_USERS:"/common/api/v1/users",
};


