import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.history.replaceState({}, document.title, "/vendor");
    }
  }, []);
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;