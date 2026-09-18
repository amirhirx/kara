import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "./components/ui/toast";
import SidebarLayout from "./components/layouts/SidebarLayouts";

export default function App() {
  return (
    <SidebarLayout>
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Toaster />
      </main>
    </SidebarLayout>
  );
}
