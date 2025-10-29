import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

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
    } else if (path === "/carrito") {
      setCurrentPage("cart");
    } else if (path.startsWith("/producto/")) {
      setCurrentPage("product");
    } else {
      setCurrentPage("home");
    }
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/login") {
        setCurrentPage("login");
      } else if (path === "/registro") {
        setCurrentPage("register");
      } else if (path === "/catalogo") {
        setCurrentPage("catalog");
      } else if (path === "/carrito") {
        setCurrentPage("cart");
      } else if (path.startsWith("/producto/")) {
        setCurrentPage("product");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  if (currentPage === "login") {
    return <LoginPage />;
  }

  if (currentPage === "register") {
    return <RegisterPage />;
  }

  if (currentPage === "catalog") {
    return <CatalogPage />;
  }

  if (currentPage === "cart") {
    return <CartPage />;
  }

  if (currentPage === "product") {
    return <ProductPage />;
  }

  return <HomePage />;
}