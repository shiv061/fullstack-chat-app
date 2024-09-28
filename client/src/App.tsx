import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/protectedRoute";
import { RedirectRoute } from "./components/protectedRoute/RedirectRoute";
import ChatWindow from "./components/chatWindow";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/:chatId" element={<ChatWindow />} />
            </Route>
          </Route>
          <Route element={<RedirectRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster closeButton richColors />
    </AuthContextProvider>
  );
}

export default App;
