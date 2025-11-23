import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CatalogPage from "./pages/Catalog/Catalogpage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/producto/:id" element={<ProductPage />} />
        <Route path="/nosotros/quiénes-somos" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}