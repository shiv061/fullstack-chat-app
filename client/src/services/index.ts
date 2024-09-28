import { TUsers } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";

export const appService = {
  signup: async (payload: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ message: string; userId: string }> => {
    const { username, email, password } = payload;
    const response = await axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
    });
    return response.data;
  },
  login: async (payload: {
    email: string;
    password: string;
  }): Promise<{
    id: number;
    username: string;
    email: string;
    token: string;
    refreshToken: string;
  }> => {
    const { email, password } = payload;
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
  refreshToken: async (payload: {
    refreshToken: string;
  }): Promise<{
    token: string;
  }> => {
    const { refreshToken } = payload;
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },
  getChatUsers: async (payload: {
    userId: number;
  }): Promise<{ users: TUsers[] }> => {
    const { userId } = payload;
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },
};
