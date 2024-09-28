import { Logout } from "@/components/sidebar/Logout";
import { UserList } from "@/components/userList";
import { Outlet } from "react-router-dom";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export function Home() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex items-center gap-4 px-4 py-4 lg:px-6">
            <img className="h-10 rounded-full" src="/logo.jpg" alt="logo" />
            <p className="font-semibold font-mono">Connect</p>
          </div>
          <div className="flex-1 mx-3">
            <UserList />
          </div>
          <div className="mt-auto p-4">
            <Logout />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
