import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

const RedirectAdmin = () => {
  window.location.href = "http://localhost:3000";
  return null;
};

const RedirectVendor = () => {
  window.location.href = "http://localhost:5174";
  return null;
};

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Redirect routes */}
      <Route path="/admin/*" element={<RedirectAdmin />} />
      <Route path="/vendor/*" element={<RedirectVendor />} />

    </Routes>
  );
};

export default AppRoutes;