import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/Product/ProductPage";
import AboutPage from "./pages/About/AboutPage";
import LocationPage from "./pages/Location/LocationPage";
import ContactPage from "./pages/Contact/ContactPage";
import ShippingPage from "./pages/ShippingLaw/ShippingPage";
import CompatibilityPage from "./pages/Compatibility/CompatibilityPage";
import WattCalculatorPage from "./pages/WattCalculator/WattCalculatorPage";
import WarrantyPage from "./pages/Warranty/WarrantyPage";
import MaintenancePage from "./pages/Maintenance/MaintenancePage";
import FAQPage from "./pages/FAQ/FAQPage"; 
import TechAdvisoryPage from "./pages/TechAdvisory/TechAdvisoryPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          
          <Route path="/componentes" element={<CategoriesPage />} />
          
          <Route path="/catalogo" element={<CatalogPage />} />
          
          <Route path="/componentes/:category" element={<CatalogPage />} />
          
          <Route path="/componentes/:category/:productId" element={<ProductPage />} />
          
          <Route path="/carrito" element={<CartPage />} />

          <Route path="/arma-tu-pc/guía-de-compatibilidad" element={<CompatibilityPage />} />
          <Route path="/arma-tu-pc/calculadora-de-watts" element={<WattCalculatorPage />} />

          <Route path="/soporte/garantías" element={<WarrantyPage />} />
          <Route path="/soporte/mantenimiento" element={<MaintenancePage />} />
          <Route path="/soporte/faq" element={<FAQPage />} />
          <Route path="/soporte/asesoría-técnica" element={<TechAdvisoryPage />} />
          
          <Route path="/nosotros/quiénes-somos" element={<AboutPage />} />
          <Route path="/nosotros/ubicación" element={<LocationPage />} />
          <Route path="/nosotros/contacto" element={<ContactPage />} />
          <Route path="/nosotros/políticas-de-envío" element={<ShippingPage />} /> 
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}