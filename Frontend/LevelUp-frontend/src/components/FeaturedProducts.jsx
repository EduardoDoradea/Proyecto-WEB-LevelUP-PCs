import "../styles/featured.css";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "RTX 4090 GAMING",
      category: "Tarjeta Gráfica",
      price: "$1,899.99",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop",
      tag: "NUEVO"
    },
    {
      id: 2,
      name: "AMD Ryzen 9 7950X",
      category: "Procesador",
      price: "$699.99",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500&h=500&fit=crop",
      tag: "BESTSELLER"
    },
    {
      id: 3,
      name: "DDR5 32GB 6000MHz",
      category: "Memoria RAM",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&h=500&fit=crop",
      tag: "OFERTA"
    },
    {
      id: 4,
      name: "NVMe SSD 2TB",
      category: "Almacenamiento",
      price: "$249.99",
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
            <div key={product.id} className="product-card">
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
                <span className="product-tag">{product.tag}</span>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button className="product-btn">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}