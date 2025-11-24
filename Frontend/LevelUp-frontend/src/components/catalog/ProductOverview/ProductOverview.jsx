import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import './catalogview.css';

const ProductOverview = ({ filters = { priceMin: null, priceMax: null, brands: [] }, products = [], category }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('todos');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, itemsPerPage, category]);

  const filteredProducts = products.filter(product => {
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

  const handleProductClick = (product) => {
    const url = `/componentes/${product.category}/${product.id}`;
    navigate(url);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart(product, 1);
    
    // Mostrar feedback visual
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    
    // Remover feedback después de 2 segundos
    setTimeout(() => {
      setAddedProducts(prev => {
        const newState = { ...prev };
        delete newState[product.id];
        return newState;
      });
    }, 2000);
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
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {product.stock < 10 && <span className="product-badge">Stock Bajo</span>}
                  {index < 3 && currentPage === 1 && <span className="product-badge">Nuevo</span>}
                </div>

                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-footer">
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <button 
                      className={`add-to-cart-btn ${addedProducts[product.id] ? 'added' : ''}`}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5 1L3 4V14C3 14.5304 3.21071 15.0391 3.58579 15.4142C3.96086 15.7893 4.46957 16 5 16H11C11.5304 16 12.0391 15.7893 12.4142 15.4142C12.7893 15.0391 13 14.5304 13 14V4L11 1H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 4H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 7C10.5 7.79565 10.1839 8.55871 9.62132 9.12132C9.05871 9.68393 8.29565 10 7.5 10C6.70435 10 5.94129 9.68393 5.37868 9.12132C4.81607 8.55871 4.5 7.79565 4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {addedProducts[product.id] ? '✓ Añadido' : 'Añadir'}
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