import { useState, useEffect, useCallback } from 'react';
import './filters.css';

const FilterComponent = ({ onFiltersChange }) => {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = [
    { name: 'ACER', count: 2 },
    { name: 'AMD', count: 5 },
    { name: 'ASUS', count: 3 },
    { name: 'HP', count: 3 },
    { name: 'INTEL', count: 1 },
    { name: 'LENOVO', count: 1 },
    { name: 'MSI', count: 5 }
  ];

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedBrands([]);
  };

  const applyFilters = useCallback(() => {
    if (onFiltersChange) {
      onFiltersChange({
        priceMin: priceMin ? parseFloat(priceMin) : null,
        priceMax: priceMax ? parseFloat(priceMax) : null,
        brands: selectedBrands
      });
    }
  }, [priceMin, priceMax, selectedBrands, onFiltersChange]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2 className="filter-title">FILTROS</h2>
        <button className="clear-btn" onClick={clearFilters}>
          Limpiar
        </button>
      </div>

      <div className="filter-section">
        <h3 className="section-title">Precio</h3>
        <div className="price-inputs">
          <div className="input-group">
            <label>Min $</label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <span className="separator">-</span>
          <div className="input-group">
            <label>Max $</label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="1000"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-title">MARCAS</h3>
        <div className="brands-list">
          {brands.map(brand => (
            <label key={brand.name} className="brand-item">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
              />
              <span className="brand-name">{brand.name}</span>
              <span className="brand-count">{brand.count}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedBrands.length > 0 && (
        <div className="active-filters">
          <p className="active-title">Filtros activos:</p>
          <div className="filter-tags">
            {selectedBrands.map(brand => (
              <span key={brand} className="filter-tag">
                {brand}
                <button onClick={() => toggleBrand(brand)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;