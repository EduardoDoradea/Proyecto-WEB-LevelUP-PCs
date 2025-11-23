import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import FilterComponent from "../../components/catalog/Filters/Filters";
import Footer from "../../components/layout/Footer/Footer";
import ProductOverview from "../../components/catalog/ProductOverview/ProductOverview";
import "./catalogpage.css";

export default function CatalogPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    brands: []
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="catalog-layout">
        <aside className="catalog-filters">
          <FilterComponent onFiltersChange={handleFiltersChange} />
        </aside>

        <section className="catalog-products">
          <ProductOverview filters={filters} />
        </section>
      </main>

      <Footer />
    </>
  );
}