import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/Catalogpage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/login") {
      setCurrentPage("login");
    } else if (path === "/registro") {
      setCurrentPage("register");
    } else if (path === "/catalogo") {
      setCurrentPage("catalog");
    } else {
      setCurrentPage("home");
    }

    // Listener para cambios en la URL (navegación manual)
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/login") {
        setCurrentPage("login");
      } else if (path === "/registro") {
        setCurrentPage("register");
      } else if (path === "/catalogo") {
        setCurrentPage("catalog");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Renderizar la página correspondiente
  if (currentPage === "login") {
    return <LoginPage />;
  }

  if (currentPage === "register") {
    return <RegisterPage />;
  }

  if (currentPage === "catalog") {
    return <CatalogPage />;
  }

  return <HomePage />;
}