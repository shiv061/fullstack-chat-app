import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Logout = () => {
  const { handleLogout, user } = useAuthContext();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center flex-wrap">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
          <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-neutral-500">{user?.username}</p>
          <p className="text-xs text-neutral-500">{user?.email}</p>
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
