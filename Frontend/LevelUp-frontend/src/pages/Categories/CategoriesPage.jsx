import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import HeroSection from "../../components/home/HeroSection/HeroSection";
import Footer from "../../components/layout/Footer/Footer";

export default function categoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    brands: []
  });

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Footer />
    </>
  );
}