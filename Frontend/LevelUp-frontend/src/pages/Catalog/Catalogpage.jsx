// Frontend/LevelUp-frontend/src/pages/Catalog/CatalogPage.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import FilterComponent from "../../components/catalog/Filters/Filters";
import Footer from "../../components/layout/Footer/Footer";
import ProductOverview from "../../components/catalog/ProductOverview/ProductOverview";
import { getProductsByCategory, getBrandsByCategory, getCategoryDisplayName } from "../../services/productService";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Cargar productos cuando cambia la categoría
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (category) {
          const categoryProducts = await getProductsByCategory(category);
          setProducts(categoryProducts);
          
          // Cargar marcas disponibles
          const brands = await getBrandsByCategory(category);
          setAvailableBrands(brands);
        } else {
          setProducts([]);
          setAvailableBrands([]);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos. Por favor intenta de nuevo.');
        setProducts([]);
        setAvailableBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Resetear filtros al cambiar de categoría
    setFilters({
      priceMin: null,
      priceMax: null,
      brands: []
    });
  }, [category]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

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
                <span className="current">{getCategoryDisplayName(category)}</span>
              </>
            )}
          </div>
          <h1 className="catalog-title">{getCategoryDisplayName(category)}</h1>
        </div>

        <div className="catalog-content">
          <aside className="catalog-filters">
            <FilterComponent 
              onFiltersChange={handleFiltersChange}
              availableBrands={availableBrands}
            />
          </aside>

          <section className="catalog-products">
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#aaa'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>
                  Cargando productos...
                </h3>
              </div>
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#ff6b6b'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>
                  Error al cargar productos
                </h3>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    background: '#00b4d8',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <ProductOverview 
                filters={filters} 
                products={products}
                category={category}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}