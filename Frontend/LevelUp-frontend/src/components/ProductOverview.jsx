import { useState, useEffect } from 'react';
import '../styles/catalogview.css';

const ProductOverview = ({ filters = { priceMin: null, priceMax: null, brands: [] } }) => {
  const [sortBy, setSortBy] = useState('todos');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const imagePlaceholder = 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop';

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, itemsPerPage]);

  const allProducts = [
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
    { id: 15, name: 'Pavilion Gaming', brand: 'HP', price: 849.99, image: imagePlaceholder },
    { id: 16, name: 'Omen 16', brand: 'HP', price: 1399.99, image: imagePlaceholder },
    { id: 17, name: 'Victus 15', brand: 'HP', price: 999.99, image: imagePlaceholder },
    { id: 18, name: 'Nitro 5', brand: 'ACER', price: 899.99, image: imagePlaceholder },
    { id: 19, name: 'Predator Helios', brand: 'ACER', price: 1599.99, image: imagePlaceholder },
    { id: 20, name: 'Core i9-14900K', brand: 'INTEL', price: 589.99, image: imagePlaceholder },
  ];

  const filteredProducts = allProducts.filter(product => {
    if (filters.priceMin !== null && filters.priceMin !== undefined && product.price < filters.priceMin) {
      return false;
    }
    
    if (filters.priceMax !== null && filters.priceMax !== undefined && product.price > filters.priceMax) {
      return false;
    }
    
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'precio-asc':
        return a.price - b.price;
      case 'precio-desc':
        return b.price - a.price;
      case 'nombre-asc':
        return a.name.localeCompare(b.name);
      case 'nombre-desc':
        return b.name.localeCompare(a.name);
      case 'marca':
        return a.brand.localeCompare(b.brand);
      case 'mas-vendidos':
        return 0;
      case 'nuevos':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayProducts = sortedProducts.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
          Se han encontrado <span>{filteredProducts.length}</span> productos
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

      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#aaa'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'white' }}>
            No se encontraron productos
          </h3>
          <p>Intenta ajustar los filtros para ver más resultados</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {displayProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {index < 3 && currentPage === 1 && <span className="product-badge">Nuevo</span>}
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

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Anterior
              </button>

              <div className="pagination-numbers">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}

          <div className="pagination-info">
            Mostrando {startIndex + 1} - {Math.min(endIndex, sortedProducts.length)} de {sortedProducts.length} productos
          </div>
        </>
      )}
    </div>
  );
};

export default ProductOverview;