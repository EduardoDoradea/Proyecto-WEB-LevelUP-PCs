import { useState } from 'react';
import '../styles/catalogview.css'; 

const ProductOverview = () => {
  const [sortBy, setSortBy] = useState('todos');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const imagePlaceholder = 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop';

  const products = [
    { id: 1, name: 'Laptop LOQ 15IRH8', brand: 'LENOVO', price: 1299.99, image: imagePlaceholder },
    { id: 2, name: 'ROG Strix G15', brand: 'ASUS', price: 1599.99, image: imagePlaceholder },
    { id: 3, name: 'TUF Gaming A15', brand: 'ASUS', price: 999.99, image: imagePlaceholder },
    { id: 4, name: 'Katana 15 B13V', brand: 'MSI', price: 1199.99, image: imagePlaceholder },
    { id: 5, name: 'Legion 5 Pro', brand: 'LENOVO', price: 1499.99, image: imagePlaceholder },
    { id: 6, name: 'Zephyrus G14', brand: 'ASUS', price: 1799.99, image: imagePlaceholder },
    { id: 7, name: 'Raider GE78', brand: 'MSI', price: 2299.99, image: imagePlaceholder },
    { id: 8, name: 'IdeaPad Gaming 3', brand: 'LENOVO', price: 899.99, image: imagePlaceholder },
    { id: 9, name: 'ROG Flow X13', brand: 'ASUS', price: 1399.99, image: imagePlaceholder },
    { id: 10, name: 'Stealth 14', brand: 'MSI', price: 1699.99, image: imagePlaceholder },
    { id: 11, name: 'Legion Slim 7', brand: 'LENOVO', price: 1899.99, image: imagePlaceholder },
    { id: 12, name: 'TUF Dash F15', brand: 'ASUS', price: 1099.99, image: imagePlaceholder },
    { id: 13, name: 'Cyborg 15', brand: 'MSI', price: 949.99, image: imagePlaceholder },
    { id: 14, name: 'LOQ 15APH8', brand: 'LENOVO', price: 1149.99, image: imagePlaceholder },
  ];

  const handleProductClick = (productId) => {
    window.history.pushState({}, '', `/producto/${productId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); 
    console.log('Añadido al carrito:', product);
  };

  return (
    <div className="catalog-container">
      <div className="results-header">
        <div className="results-count">
          Se han encontrado <span>{products.length}</span> productos
        </div>

        <div className="results-controls">
          <div className="control-group">
            <label htmlFor="sort-select">Ordenar por:</label>
            <select
              id="sort-select"
              className="select-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre-asc">Nombre: A-Z</option>
              <option value="nombre-desc">Nombre: Z-A</option>
              <option value="marca">Marca</option>
              <option value="mas-vendidos">Más Vendidos</option>
              <option value="nuevos">Más Recientes</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="items-select">Registros:</label>
            <select
              id="items-select"
              className="select-dropdown"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10 Registros</option>
              <option value="20">20 Registros</option>
              <option value="30">30 Registros</option>
              <option value="50">50 Registros</option>
              <option value="100">100 Registros</option>
            </select>
          </div>
        </div>
      </div>
      <div className="products-grid">
        {products.slice(0, itemsPerPage).map((product, index) => (
          <div 
            key={product.id} 
            className="product-card" 
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              {index < 3 && <span className="product-badge">Nuevo</span>}
            </div>

            <div className="product-info">
              <div className="product-brand">{product.brand}</div>
              <h3 className="product-name">{product.name}</h3>

              <div className="product-footer">
                <div className="product-price">${product.price}</div>
                <button 
                  className="add-to-cart-btn" 
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 1L3 4V14C3 14.5304 3.21071 15.0391 3.58579 15.4142C3.96086 15.7893 4.46957 16 5 16H11C11.5304 16 12.0391 15.7893 12.4142 15.4142C12.7893 15.0391 13 14.5304 13 14V4L11 1H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 4H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 7C10.5 7.79565 10.1839 8.55871 9.62132 9.12132C9.05871 9.68393 8.29565 10 7.5 10C6.70435 10 5.94129 9.68393 5.37868 9.12132C4.81607 8.55871 4.5 7.79565 4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOverview;