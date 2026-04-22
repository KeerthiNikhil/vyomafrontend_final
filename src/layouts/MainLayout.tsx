import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (

    <div className="flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>

  );
};

export default MainLayout;