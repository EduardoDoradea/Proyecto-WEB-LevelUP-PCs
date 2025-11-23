import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import Footer from "../components/layout/Footer/Footer";
import "../styles/productpage.css";

export default function ProductPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('specs');

  // Simulación de datos del producto - esto vendría del backend/API
  const product = {
    id: 1,
    name: "NVIDIA GeForce RTX 4090",
    brand: "NVIDIA",
    category: "Tarjetas Gráficas",
    price: 1899.99,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=600&fit=crop"
    ],
    description: "La tarjeta gráfica más potente del mercado. Diseñada para gaming extremo, creación de contenido profesional y workloads de IA. Equipada con arquitectura Ada Lovelace y 24GB GDDR6X.",
    specifications: {
      "GPU": "NVIDIA Ada Lovelace",
      "Núcleos CUDA": "16,384",
      "Memoria": "24GB GDDR6X",
      "Ancho de banda": "1,008 GB/s",
      "TDP": "450W",
      "Conectores": "3x DisplayPort 1.4a, 1x HDMI 2.1",
      "Dimensiones": "304 x 137 x 61 mm",
      "Refrigeración": "Triple ventilador"
    },
    features: [
      "Ray Tracing de tercera generación",
      "DLSS 3 con generación de frames por IA",
      "Compatible con DirectX 12 Ultimate",
      "NVIDIA Reflex para latencia ultra baja",
      "Overclocking automático con GPU Boost",
      "Backplate de aluminio premium"
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "AMD Ryzen 9 7950X",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "DDR5 64GB 6000MHz",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "PSU 1000W 80+ Gold",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop"
    }
  ];

  const handleQuantityChange = (value) => {
    const newQty = quantity + value;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    console.log(`Añadiendo ${quantity} unidad(es) al carrito`);
    // Aquí iría la lógica para añadir al carrito
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="product-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="breadcrumb-container">
            <a href="/">Inicio</a>
            <span>/</span>
            <a href="/catalogo">Catálogo</a>
            <span>/</span>
            <a href={`/catalogo/${product.category.toLowerCase()}`}>{product.category}</a>
            <span>/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="product-container">
          {/* Galería de Imágenes */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="gallery-thumbnails">
              {product.images.map((img, index) => (
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
              <p className="product-category">{product.category}</p>
            </div>

            <div className="product-price-section">
              <div className="price-main">
                <span className="price-amount">${product.price}</span>
                <span className="price-tax">IVA incluido</span>
              </div>
              <div className="stock-info">
                <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                  {product.stock > 10 ? 'En Stock' : `Solo ${product.stock} disponibles`}
                </span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
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
              <button className="btn-buy-now">
                Comprar Ahora
              </button>
            </div>

            {/* Features Destacados */}
            <div className="product-highlights">
              <h3>Características Destacadas</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
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
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'compatibility' && (
                <div className="compatibility-content">
                  <h3>Requisitos del Sistema</h3>
                  <ul>
                    <li>Fuente de poder mínima de 850W recomendada</li>
                    <li>Slot PCIe 4.0 x16 (compatible con 3.0)</li>
                    <li>Espacio libre de 304mm en el gabinete</li>
                    <li>Sistema operativo: Windows 10/11 64-bit</li>
                    <li>Procesador Intel Core i7 o AMD Ryzen 7 (recomendado)</li>
                  </ul>
                </div>
              )}

              {selectedTab === 'warranty' && (
                <div className="warranty-content">
                  <h3>Garantía de 3 Años</h3>
                  <p>Todos nuestros productos incluyen garantía del fabricante. Soporte técnico disponible 24/7.</p>
                  <ul>
                    <li>Garantía del fabricante de 3 años</li>
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
        <div className="related-products">
          <div className="related-container">
            <h2>También te puede interesar</h2>
            <div className="related-grid">
              {relatedProducts.map(item => (
                <a key={item.id} href={`/producto/${item.id}`} className="related-card">
                  <div className="related-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="related-info">
                    <h3>{item.name}</h3>
                    <p className="related-price">${item.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}