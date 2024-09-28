import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "@/types";
import { toast } from "sonner";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  });

  const handleUser = useCallback((payload: User) => {
    setUser(payload);
    localStorage.setItem("user", JSON.stringify(payload));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("User logged out");
  }, []);

  const sendValue = useMemo(() => {
    return { user, handleUser, handleLogout };
  }, [user, handleUser, handleLogout]);

  return (
    <AuthContext.Provider value={sendValue}>{children}</AuthContext.Provider>
  );
};
