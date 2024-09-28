import { useAuthContext } from "@/context/AuthContext";
import { appService } from "@/services";
import { useCallback, useEffect, useState } from "react";
import { UserItem } from "./UserItem";
import { TUsers } from "@/types";

export const UserList = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [, setIsLoading] = useState(false);

  const { user } = useAuthContext();

  const getChatUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      if (user) {
        const { users } = await appService.getChatUsers({ userId: user.id });
        setUsers(users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <div className="h-full bg-stone-50 rounded-lg">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          username={user.username}
          email={user.email}
        />
      ))}
    </div>
  );
};
