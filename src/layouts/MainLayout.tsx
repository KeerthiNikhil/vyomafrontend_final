import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <main className="flex-1 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;
