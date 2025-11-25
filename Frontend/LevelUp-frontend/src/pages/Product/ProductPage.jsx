// Frontend/LevelUp-frontend/src/pages/Product/ProductPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import { getProductById, getProductsByCategory, getCategoryDisplayName } from "../../services/productService";
import "./productpage.css";

export default function ProductPage() {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('specs');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener el producto
        const foundProduct = await getProductById(productId);

        if (!foundProduct) {
          navigate('/404');
          return;
        }

        // Verificar que la categoría coincida
        if (foundProduct.category !== category) {
          navigate(`/componentes/${foundProduct.category}/${productId}`);
          return;
        }

        setProduct(foundProduct);

        // Obtener productos relacionados de la misma categoría
        const categoryProducts = await getProductsByCategory(foundProduct.category);
        const related = categoryProducts
          .filter((p) => p.id !== foundProduct.id)
          .slice(0, 3);

        setRelatedProducts(related);

        // Reset de estados
        setQuantity(1);
        setSelectedTab('specs');

        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, category, navigate]);

  if (loading) {
    return (
      <>
        <Navbar onMenuToggle={() => setMenuOpen(true)} />
        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="product-page">
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            color: '#aaa',
            minHeight: '60vh'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
            <h3 style={{ fontSize: '24px', color: 'white' }}>
              Cargando producto...
            </h3>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar onMenuToggle={() => setMenuOpen(true)} />
        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="product-page">
          <div style={{
            textAlign: 'center',
            padding: '100px 20px',
            color: '#ff6b6b',
            minHeight: '60vh'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>
              Producto no encontrado
            </h3>
            <p>{error || 'El producto que buscas no existe'}</p>
            <button 
              onClick={() => navigate('/componentes')}
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
              Ver Catálogo
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (value) => {
    const newQty = quantity + value;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedMessage(true);
    
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/carrito');
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {showAddedMessage && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 180, 216, 0.4)',
          zIndex: 9999,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          ✓ Producto agregado al carrito
        </div>
      )}

      <main className="product-page">
        <div className="breadcrumb">
          <div className="breadcrumb-container">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/componentes">Componentes</Link>
            <span>/</span>
            <Link to={`/componentes/${product.category}`}>{getCategoryDisplayName(product.category)}</Link>
            <span>/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>

        <div className="product-container">
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <span className="product-brand">{product.brand}</span>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-category">{getCategoryDisplayName(product.category)}</p>
            </div>

            <div className="product-price-section">
              <div className="price-main">
                <span className="price-amount">${product.price.toFixed(2)}</span>
                <span className="price-tax">IVA incluido</span>
              </div>
              <div className="stock-info">
                <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                  {product.stock > 10 ? 'En Stock' : `Solo ${product.stock} disponibles`}
                </span>
              </div>
            </div>

            <div className="product-description">
              <p>
                {product.description || `${product.brand} ${product.name} - Un componente de alta calidad para tu PC.`}
                {product.specs && Object.keys(product.specs).length > 0 && 
                  ` Con especificaciones premium que garantizan el mejor rendimiento.`
                }
              </p>
            </div>

            <div className="quantity-section">
              <label>Cantidad</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                Añadir al Carrito
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                Comprar Ahora
              </button>
            </div>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="product-highlights">
                <h3>Características Destacadas</h3>
                <ul>
                  {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="product-details">
          <div className="details-container">
            <div className="tabs-header">
              <button
                className={`tab-btn ${selectedTab === 'specs' ? 'active' : ''}`}
                onClick={() => setSelectedTab('specs')}
              >
                Especificaciones
              </button>
              <button
                className={`tab-btn ${selectedTab === 'compatibility' ? 'active' : ''}`}
                onClick={() => setSelectedTab('compatibility')}
              >
                Compatibilidad
              </button>
              <button
                className={`tab-btn ${selectedTab === 'warranty' ? 'active' : ''}`}
                onClick={() => setSelectedTab('warranty')}
              >
                Garantía y Soporte
              </button>
            </div>

            <div className="tabs-content">
              {selectedTab === 'specs' && (
                <div className="specs-grid">
                  {product.specs && Object.keys(product.specs).length > 0 ? (
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <span className="spec-label">{key}</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="spec-item">
                      <span className="spec-label">Marca</span>
                      <span className="spec-value">{product.brand}</span>
                    </div>
                  )}
                  <div className="spec-item">
                    <span className="spec-label">Precio</span>
                    <span className="spec-value">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Stock Disponible</span>
                    <span className="spec-value">{product.stock} unidades</span>
                  </div>
                </div>
              )}

              {selectedTab === 'compatibility' && (
                <div className="compatibility-content">
                  <h3>Requisitos y Compatibilidad</h3>
                  <p>Este producto es compatible con la mayoría de configuraciones modernas.</p>
                  <ul>
                    <li>Compatible con sistemas recientes</li>
                    <li>Instalación sencilla y directa</li>
                    <li>Incluye todas las conexiones necesarias</li>
                    <li>Soporte para las últimas tecnologías</li>
                  </ul>
                </div>
              )}

              {selectedTab === 'warranty' && (
                <div className="warranty-content">
                  <h3>Garantía y Soporte</h3>
                  <p>Todos nuestros productos incluyen garantía del fabricante. Soporte técnico disponible.</p>
                  <ul>
                    <li>Garantía del fabricante incluida</li>
                    <li>Soporte técnico especializado</li>
                    <li>Cambio inmediato en caso de defecto de fábrica</li>
                    <li>Asistencia en instalación y configuración</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <div className="related-container">
              <h2>También te puede interesar</h2>
              <div className="related-grid">
                {relatedProducts.map(item => (
                  <Link key={item.id} to={`/componentes/${item.category}/${item.id}`} className="related-card">
                    <div className="related-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="related-info">
                      <h3>{item.name}</h3>
                      <p className="related-price">${item.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}