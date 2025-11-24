import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CatalogPage from "./pages/Catalog/Catalogpage";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/Product/ProductPage";
import AboutPage from "./pages/About/AboutPage";
import LocationPage from "./pages/Location/LocationPage";
import ContactPage from "./pages/Contact/ContactPage";
import ShippingPage from "./pages/ShippingLaw/ShippingPage"; // Nueva importación
import NotFoundPage from "./pages/NotFound/NotFoundPage";

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
        <Route path="/nosotros/ubicación" element={<LocationPage />} />
        <Route path="/nosotros/contacto" element={<ContactPage />} />
        <Route path="/nosotros/políticas-de-envío" element={<ShippingPage />} /> {/* Nueva ruta */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}