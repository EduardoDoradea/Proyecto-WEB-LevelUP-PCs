import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import FilterComponent from "../../components/catalog/Filters/Filters";
import Footer from "../../components/layout/Footer/Footer";
import ProductOverview from "../../components/catalog/ProductOverview/ProductOverview";
import { getProductsByCategory } from "../../data/productsData";
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

  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
    } else {
      setProducts([]);
    }

    // Resetear filtros al cambiar de categoría
    setFilters({
      priceMin: null,
      priceMax: null,
      brands: []
    });
  }, [category]);

  // Calcular marcas disponibles dinámicamente con su conteo
  const availableBrands = useMemo(() => {
    if (!products.length) return [];
    
    const brandCounts = {};
    products.forEach(product => {
      if (product.brand) {
        brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
      }
    });

    return Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

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
            <a href="/componentes">Componentes</a>
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