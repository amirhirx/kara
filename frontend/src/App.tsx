import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "./components/ui/toast";
import ProtectedRoute from "./components/base/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <main className="w-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </main>
  );
}
