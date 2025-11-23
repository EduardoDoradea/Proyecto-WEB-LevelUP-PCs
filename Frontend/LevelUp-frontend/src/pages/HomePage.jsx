import { useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import SidebarMenu from "../components/layout/SidebarMenu/SidebarMenu";
import HeroSection from "../components/home/HeroSection/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import FlashDeals from "../components/FlashDeals";
import Footer from "../components/layout/Footer/Footer";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <FeaturedProducts />
      <FlashDeals />
      <Footer />
    </>
  );
}