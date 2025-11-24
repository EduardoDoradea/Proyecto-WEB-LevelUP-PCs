import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import FilterComponent from "../../components/catalog/Filters/Filters";
import Footer from "../../components/layout/Footer/Footer";
import ProductOverview from "../../components/catalog/ProductOverview/ProductOverview";
import { getProductsByCategory, getBrandsByCategory } from "../../data/productsData";
import "./catalogpage.css";

export default function CatalogPage() {
  const { category } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    brands: []
  });
  const [products, setProducts] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      
      const brands = getBrandsByCategory(category);
      setAvailableBrands(brands);
    } else {
      setProducts([]);
    }

    setFilters({
      priceMin: null,
      priceMax: null,
      brands: []
    });
  }, [category]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const getCategoryTitle = () => {
    const titles = {
      'procesadores': 'Procesadores',
      'tarjetas-graficas': 'Tarjetas Gráficas',
      'memoria-ram': 'Memoria RAM',
      'almacenamiento': 'Almacenamiento',
      'placas-madre': 'Placas Madre',
      'fuentes-poder': 'Fuentes de Poder',
      'gabinetes': 'Gabinetes',
      'refrigeracion': 'Refrigeración'
    };
    return titles[category] || 'Todos los Productos';
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="catalog-layout">
        <div className="catalog-header">
          <div className="catalog-breadcrumb">
            <a href="/">Inicio</a>
            <span>/</span>
            <a href="/categorias">Categorías</a>
            {category && (
              <>
                <span>/</span>
                <span className="current">{getCategoryTitle()}</span>
              </>
            )}
          </div>
          <h1 className="catalog-title">{getCategoryTitle()}</h1>
        </div>

        <div className="catalog-content">
          <aside className="catalog-filters">
            <FilterComponent 
              onFiltersChange={handleFiltersChange}
              availableBrands={availableBrands}
            />
          </aside>

          <section className="catalog-products">
            <ProductOverview 
              filters={filters} 
              products={products}
              category={category}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}