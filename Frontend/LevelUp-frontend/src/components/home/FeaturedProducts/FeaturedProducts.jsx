import "./featured.css";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop",
      tag: "NUEVO"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500&h=500&fit=crop",
      tag: "BESTSELLER"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&h=500&fit=crop",
      tag: "RENDIMIENTO"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
      tag: "PREMIUM"
    }
  ];

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <h2>Productos Destacados</h2>
          <p>Lo mejor en hardware de alto rendimiento</p>
        </div>
        
        <div className="featured-grid">
          {products.map(product => (
            product.id === 1 ? (
              <a
                key={product.id}
                className="product-card"
                href="http://localhost:5173/componentes/tarjetas-graficas/7"
              >
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <span className="product-tag">{product.tag}</span>
                </div>
              </a>
            ) : product.id === 2 ? (
              <a
                key={product.id}
                className="product-card"
                href="http://localhost:5173/componentes/procesadores/3"
              >
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <span className="product-tag">{product.tag}</span>
                </div>
              </a>
            ) : product.id === 3 ? (
              <a
                key={product.id}
                className="product-card"
                href="http://localhost:5173/componentes/memoria-ram/12"
              >
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <span className="product-tag">{product.tag}</span>
                </div>
              </a>
            ) : product.id === 4 ? (
              <a
                key={product.id}
                className="product-card"
                href="http://localhost:5173/componentes/refrigeracion/29"
              >
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <span className="product-tag">{product.tag}</span>
                </div>
              </a>
            ) : (
              <div key={product.id} className="product-card">
                <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                  <span className="product-tag">{product.tag}</span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}