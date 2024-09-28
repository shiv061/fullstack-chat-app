import { User } from "@/types";
import { createContext, useContext } from "react";

export const AuthContext = createContext(
  {} as {
    user: User | null;
    handleUser: (payload: User) => void;
    handleLogout: () => void;
  }
);

export const useAuthContext = () => useContext(AuthContext);
