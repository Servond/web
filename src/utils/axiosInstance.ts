import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const instance = (): AxiosInstance => {
  const token = getCookie("access-token") || "";
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export default instance;
