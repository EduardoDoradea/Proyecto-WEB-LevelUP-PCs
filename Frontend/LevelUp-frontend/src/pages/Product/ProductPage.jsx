import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import { getProductById, productsDatabase } from "../../data/productsData";
import "./productpage.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('specs');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Obtener el producto por ID
    const foundProduct = getProductById(id);
    
    if (!foundProduct) {
      // Si no se encuentra el producto, redirigir a 404
      navigate('/404');
      return;
    }

    setProduct(foundProduct);

    // Obtener productos relacionados de la misma categoría
    const related = productsDatabase
      .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
      .slice(0, 3);
    
    setRelatedProducts(related);

    // Resetear estados cuando cambia el producto
    setSelectedImage(0);
    setQuantity(1);
    setSelectedTab('specs');
    
    // Scroll al inicio
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Mostrar loading mientras se carga el producto
  if (!product) {
    return (
      <>
        <Navbar onMenuToggle={() => setMenuOpen(true)} />
        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#000',
          color: '#fff'
        }}>
          <p>Cargando producto...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Crear un array de imágenes (si solo hay una, repetirla)
  const productImages = Array.isArray(product.image) 
    ? product.image 
    : [product.image, product.image, product.image, product.image];

  const handleQuantityChange = (value) => {
    const newQty = quantity + value;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    console.log(`Añadiendo ${quantity} unidad(es) de ${product.name} al carrito`);
    alert(`Se añadieron ${quantity} unidad(es) de ${product.name} al carrito`);
  };

  const handleBuyNow = () => {
    console.log(`Comprando ${quantity} unidad(es) de ${product.name}`);
    navigate('/carrito');
  };

  const getCategoryDisplayName = () => {
    const categoryNames = {
      'procesadores': 'Procesadores',
      'tarjetas-graficas': 'Tarjetas Gráficas',
      'memoria-ram': 'Memoria RAM',
      'almacenamiento': 'Almacenamiento',
      'placas-madre': 'Placas Madre',
      'fuentes-poder': 'Fuentes de Poder',
      'gabinetes': 'Gabinetes',
      'refrigeracion': 'Refrigeración'
    };
    return categoryNames[product.category] || product.category;
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="product-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="breadcrumb-container">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/categorias">Categorías</Link>
            <span>/</span>
            <Link to={`/componentes/${product.category}`}>{getCategoryDisplayName()}</Link>
            <span>/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="product-container">
          {/* Galería de Imágenes */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={productImages[selectedImage]} alt={product.name} />
            </div>
            <div className="gallery-thumbnails">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Vista ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="product-info">
            <div className="product-header">
              <span className="product-brand">{product.brand}</span>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-category">{getCategoryDisplayName()}</p>
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

            {/* Descripción generada basada en el producto */}
            <div className="product-description">
              <p>
                {product.brand} {product.name} - Un componente de alta calidad para tu PC. 
                {product.specs && Object.keys(product.specs).length > 0 && 
                  ` Con especificaciones premium que garantizan el mejor rendimiento.`
                }
              </p>
            </div>

            {/* Selector de Cantidad */}
            <div className="quantity-section">
              <label>Cantidad</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="action-buttons">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                Añadir al Carrito
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                Comprar Ahora
              </button>
            </div>

            {/* Features Destacados - Si existen specs */}
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

        {/* Tabs de Información Detallada */}
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

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <div className="related-container">
              <h2>También te puede interesar</h2>
              <div className="related-grid">
                {relatedProducts.map(item => (
                  <Link key={item.id} to={`/producto/${item.id}`} className="related-card">
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