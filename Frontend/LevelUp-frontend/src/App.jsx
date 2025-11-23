import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/Product/ProductPage";
import AboutPage from "./pages/About/AboutPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        <Route path="/categorias" element={<CategoriesPage />} />
        
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/componentes/:category" element={<CatalogPage />} />
        
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/producto/:id" element={<ProductPage />} />
        <Route path="/nosotros/quiénes-somos" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}