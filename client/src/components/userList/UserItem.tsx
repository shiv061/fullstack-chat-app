import { TUsers } from "@/types";
import { Link } from "react-router-dom";

export const UserItem = ({ id, email, username }: TUsers) => {
  return (
    <Link to={`/${id}`}>
      <div className="p-2 m-2 hover:bg-stone-100 rounded-md">
        <p className="font-semibold text-neutral-500">{username}</p>
        <p className="text-sm text-neutral-400">{email}</p>
      </div>
    </Link>
  );
};
