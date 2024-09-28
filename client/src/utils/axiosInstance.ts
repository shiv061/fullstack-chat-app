import { appService } from "@/services";
import { User } from "@/types";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "0") as User | null;
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = JSON.parse(localStorage.getItem("user") || "0") as User;
        if (user) {
          const { token } = await appService.refreshToken({
            refreshToken: user.refreshToken,
          });
          user.token = token;
          localStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("user");
        console.error(error);
      }
    }
  }
);
