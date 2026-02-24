import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

/* ================= PUBLIC ================= */
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;