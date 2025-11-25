// Frontend/LevelUp-frontend/src/services/productService.js
import api from "../utils/api.js";

/**
 * Mapeo de nombres de categoría del frontend a valores de "tipo" del backend
 * ESTE ES EL CAMPO QUE SI INFLUYE
 */
const CATEGORY_TO_TYPE_MAP = {
    'procesadores': 'Procesadores',
    'tarjetas-graficas': 'tarjetas-graficas',
    'memoria-ram': 'memoria-ram',
    'almacenamiento': 'almacenamiento',
    'placas-madre': 'placas-madre',
    'fuentes-poder': 'fuentes-poder',
    'gabinetes': 'gabinetes',
    'refrigeracion': 'refrigeracion'
};

/**
 * Mapeo inverso: de tipo backend a categoría frontend
 * este parece ser que vale madres ni afecta en nada....
 */
const TYPE_TO_CATEGORY_MAP = {
    'procesadores': 'Procesadores',
    'tarjetas-graficas': 'Tarjetas Gráficas',
    'memoria-ram': 'Memoria RAM',
    'almacenamiento': 'Almacenamiento',
    'placas-madre': 'Placas Madre',
    'gabinetes': 'Gabinetes',
    'refrigeracion': 'Refrigeración'
};

/**
 * Obtiene todos los productos con filtros opcionales
 * @param {Object} filters - Filtros: { tipo, idMarca }
 * @returns {Promise<Array>} Lista de productos
 */
export const getAllProducts = async (filters = {}) => {
  try {
    const response = await api.get('/api/producto', { params: filters });
    return response.data.map(normalizeProduct);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtiene productos por categoría (tipo)
 * @param {string} category - Nombre de categoría del frontend (ej: 'procesadores')
 * @returns {Promise<Array>} Lista de productos de esa categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    const tipo = CATEGORY_TO_TYPE_MAP[category];
    
    if (!tipo) {
      console.warn(`Categoría '${category}' no mapeada`);
      return [];
    }

    const response = await api.get('/api/producto', { 
      params: { tipo } 
    });
    
    return response.data.map(normalizeProduct);
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${category}:`, error);
    throw error;
  }
};

/**
 * Obtiene un producto por su ID
 * @param {number|string} productId - ID del producto
 * @returns {Promise<Object|null>} Producto encontrado o null
 */
export const getProductById = async (productId) => {
  try {
    // Obtener todos los productos y filtrar por ID
    // (Alternativa: crear endpoint específico en backend)
    const response = await api.get('/api/producto');
    const product = response.data.find(p => p.idProducto === parseInt(productId));
    
    return product ? normalizeProduct(product) : null;
  } catch (error) {
    console.error(`Error al obtener producto ${productId}:`, error);
    throw error;
  }
};

/**
 * Obtiene todas las marcas únicas de una categoría
 * @param {string} category - Nombre de categoría del frontend
 * @returns {Promise<Array>} Lista de objetos { name, count }
 */
export const getBrandsByCategory = async (category) => {
  try {
    const products = await getProductsByCategory(category);
    
    // Contar productos por marca
    const brandCounts = {};
    products.forEach(product => {
      if (product.brand) {
        brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
      }
    });

    return Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(`Error al obtener marcas de ${category}:`, error);
    return [];
  }
};

/**
 * Normaliza un producto del backend al formato del frontend
 * @param {Object} product - Producto del backend
 * @returns {Object} Producto normalizado
 */
function normalizeProduct(product) {
  return {
    id: product.idProducto,
    name: product.nombre,
    brand: product.marca || 'Sin marca',
    category: TYPE_TO_CATEGORY_MAP[product.tipo] || 'otros',
    price: parseFloat(product.precio) || 0,
    image: product.imagen || 'https://via.placeholder.com/400x300?text=Sin+Imagen',
    stock: product.stock || 478, // Stock por defecto si no existe en BD
    description: product.descripcion || '',
    specs: parseSpecs(product)
  };
}

/**
 * Extrae specs del producto si están disponibles
 * Ajusta según la estructura real de tu base de datos
 */
function parseSpecs(product) {
  const specs = {};
  
  // Ejemplo: Si tu BD tiene columnas específicas
  if (product.especificaciones) {
    // Si las specs están en JSON
    try {
      return JSON.parse(product.especificaciones);
    } catch {
      return {};
    }
  }
  
  // O si están en columnas separadas (ajusta según tu estructura)
  // if (product.nucleos) specs.nucleos = product.nucleos;
  // if (product.frecuencia) specs.frecuencia = product.frecuencia;
  
  return specs;
}

/**
 * Obtiene el nombre display de una categoría
 */
export const getCategoryDisplayName = (category) => {
  const names = {
    'procesadores': 'Procesadores',
    'tarjetas-graficas': 'Tarjetas Gráficas',
    'memoria-ram': 'Memoria RAM',
    'almacenamiento': 'Almacenamiento',
    'placas-madre': 'Placas Madre',
    'fuentes-poder': 'Fuentes de Poder',
    'gabinetes': 'Gabinetes',
    'refrigeracion': 'Refrigeración'
  };
  return names[category] || category;
};

export default {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getBrandsByCategory,
  getCategoryDisplayName
};