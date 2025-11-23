// src/data/productsData.js

export const productsDatabase = [
  // PROCESADORES
  {
    id: 1,
    name: "Intel Core i9-14900K",
    brand: "INTEL",
    category: "procesadores",
    price: 589.99,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    stock: 15,
    specs: {
      cores: "24 núcleos",
      threads: "32 hilos",
      baseClock: "3.2 GHz",
      boostClock: "6.0 GHz"
    }
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X",
    brand: "AMD",
    category: "procesadores",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    stock: 12,
    specs: {
      cores: "16 núcleos",
      threads: "32 hilos",
      baseClock: "4.5 GHz",
      boostClock: "5.7 GHz"
    }
  },
  {
    id: 3,
    name: "Intel Core i7-14700K",
    brand: "INTEL",
    category: "procesadores",
    price: 419.99,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    stock: 20,
    specs: {
      cores: "20 núcleos",
      threads: "28 hilos",
      baseClock: "3.4 GHz",
      boostClock: "5.6 GHz"
    }
  },
  {
    id: 4,
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    category: "procesadores",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
    stock: 8,
    specs: {
      cores: "8 núcleos",
      threads: "16 hilos",
      baseClock: "4.2 GHz",
      boostClock: "5.0 GHz"
    }
  },
  {
    id: 5,
    name: "Intel Core i5-14600K",
    brand: "INTEL",
    category: "procesadores",
    price: 319.99,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
    stock: 25,
    specs: {
      cores: "14 núcleos",
      threads: "20 hilos",
      baseClock: "3.5 GHz",
      boostClock: "5.3 GHz"
    }
  },

  // TARJETAS GRÁFICAS
  {
    id: 6,
    name: "NVIDIA RTX 4090",
    brand: "NVIDIA",
    category: "tarjetas-graficas",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    stock: 5,
    specs: {
      memory: "24GB GDDR6X",
      cores: "16384 CUDA",
      tdp: "450W"
    }
  },
  {
    id: 7,
    name: "NVIDIA RTX 4080 SUPER",
    brand: "NVIDIA",
    category: "tarjetas-graficas",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    stock: 10,
    specs: {
      memory: "16GB GDDR6X",
      cores: "10240 CUDA",
      tdp: "320W"
    }
  },
  {
    id: 8,
    name: "AMD Radeon RX 7900 XTX",
    brand: "AMD",
    category: "tarjetas-graficas",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    stock: 7,
    specs: {
      memory: "24GB GDDR6",
      cores: "6144 Stream",
      tdp: "355W"
    }
  },
  {
    id: 9,
    name: "NVIDIA RTX 4070 Ti SUPER",
    brand: "NVIDIA",
    category: "tarjetas-graficas",
    price: 849.99,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    stock: 15,
    specs: {
      memory: "16GB GDDR6X",
      cores: "8448 CUDA",
      tdp: "285W"
    }
  },
  {
    id: 10,
    name: "AMD Radeon RX 7800 XT",
    brand: "AMD",
    category: "tarjetas-graficas",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    stock: 12,
    specs: {
      memory: "16GB GDDR6",
      cores: "3840 Stream",
      tdp: "263W"
    }
  },

  // MEMORIA RAM
  {
    id: 11,
    name: "Corsair Vengeance DDR5 32GB 6000MHz",
    brand: "CORSAIR",
    category: "memoria-ram",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop",
    stock: 30,
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "6000MHz",
      type: "DDR5"
    }
  },
  {
    id: 12,
    name: "G.Skill Trident Z5 RGB 32GB 6400MHz",
    brand: "G.SKILL",
    category: "memoria-ram",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop",
    stock: 20,
    specs: {
      capacity: "32GB (2x16GB)",
      speed: "6400MHz",
      type: "DDR5"
    }
  },
  {
    id: 13,
    name: "Kingston Fury Beast DDR5 64GB 5600MHz",
    brand: "KINGSTON",
    category: "memoria-ram",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop",
    stock: 15,
    specs: {
      capacity: "64GB (2x32GB)",
      speed: "5600MHz",
      type: "DDR5"
    }
  },
  {
    id: 14,
    name: "Corsair Dominator Platinum RGB 64GB 6200MHz",
    brand: "CORSAIR",
    category: "memoria-ram",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop",
    stock: 10,
    specs: {
      capacity: "64GB (2x32GB)",
      speed: "6200MHz",
      type: "DDR5"
    }
  },

  // ALMACENAMIENTO
  {
    id: 15,
    name: "Samsung 990 PRO 2TB NVMe",
    brand: "SAMSUNG",
    category: "almacenamiento",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    stock: 25,
    specs: {
      capacity: "2TB",
      type: "NVMe M.2",
      speed: "7450 MB/s"
    }
  },
  {
    id: 16,
    name: "WD Black SN850X 2TB NVMe",
    brand: "WESTERN DIGITAL",
    category: "almacenamiento",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    stock: 20,
    specs: {
      capacity: "2TB",
      type: "NVMe M.2",
      speed: "7300 MB/s"
    }
  },
  {
    id: 17,
    name: "Crucial P5 Plus 1TB NVMe",
    brand: "CRUCIAL",
    category: "almacenamiento",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    stock: 35,
    specs: {
      capacity: "1TB",
      type: "NVMe M.2",
      speed: "6600 MB/s"
    }
  },
  {
    id: 18,
    name: "Seagate FireCuda 530 4TB NVMe",
    brand: "SEAGATE",
    category: "almacenamiento",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    stock: 8,
    specs: {
      capacity: "4TB",
      type: "NVMe M.2",
      speed: "7300 MB/s"
    }
  },

  // PLACAS MADRE
  {
    id: 19,
    name: "ASUS ROG Maximus Z790 Hero",
    brand: "ASUS",
    category: "placas-madre",
    price: 629.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    stock: 10,
    specs: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX"
    }
  },
  {
    id: 20,
    name: "MSI MPG X670E Carbon WiFi",
    brand: "MSI",
    category: "placas-madre",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    stock: 12,
    specs: {
      socket: "AM5",
      chipset: "X670E",
      formFactor: "ATX"
    }
  },
  {
    id: 21,
    name: "Gigabyte Z790 AORUS Master",
    brand: "GIGABYTE",
    category: "placas-madre",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    stock: 8,
    specs: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX"
    }
  },

  // FUENTES DE PODER
  {
    id: 22,
    name: "Corsair RM1000x 1000W 80+ Gold",
    brand: "CORSAIR",
    category: "fuentes-poder",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop",
    stock: 15,
    specs: {
      wattage: "1000W",
      efficiency: "80+ Gold",
      modular: "Full Modular"
    }
  },
  {
    id: 23,
    name: "EVGA SuperNOVA 850W 80+ Platinum",
    brand: "EVGA",
    category: "fuentes-poder",
    price: 169.99,
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop",
    stock: 20,
    specs: {
      wattage: "850W",
      efficiency: "80+ Platinum",
      modular: "Full Modular"
    }
  },
  {
    id: 24,
    name: "Seasonic FOCUS GX-750 750W 80+ Gold",
    brand: "SEASONIC",
    category: "fuentes-poder",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop",
    stock: 25,
    specs: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modular: "Full Modular"
    }
  },

  // GABINETES
  {
    id: 25,
    name: "NZXT H7 Flow RGB",
    brand: "NZXT",
    category: "gabinetes",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop",
    stock: 12,
    specs: {
      type: "Mid Tower",
      formFactor: "ATX",
      fans: "3x 120mm RGB"
    }
  },
  {
    id: 26,
    name: "Corsair 4000D Airflow",
    brand: "CORSAIR",
    category: "gabinetes",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop",
    stock: 18,
    specs: {
      type: "Mid Tower",
      formFactor: "ATX",
      fans: "2x 120mm"
    }
  },
  {
    id: 27,
    name: "Lian Li O11 Dynamic EVO",
    brand: "LIAN LI",
    category: "gabinetes",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop",
    stock: 10,
    specs: {
      type: "Mid Tower",
      formFactor: "ATX",
      fans: "Not included"
    }
  },

  // REFRIGERACIÓN
  {
    id: 28,
    name: "Corsair iCUE H150i Elite LCD XT",
    brand: "CORSAIR",
    category: "refrigeracion",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop",
    stock: 15,
    specs: {
      type: "Líquida AIO",
      size: "360mm",
      fans: "3x 120mm RGB"
    }
  },
  {
    id: 29,
    name: "NZXT Kraken Elite 360 RGB",
    brand: "NZXT",
    category: "refrigeracion",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop",
    stock: 12,
    specs: {
      type: "Líquida AIO",
      size: "360mm",
      fans: "3x 120mm RGB"
    }
  },
  {
    id: 30,
    name: "Noctua NH-D15 chromax.black",
    brand: "NOCTUA",
    category: "refrigeracion",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop",
    stock: 20,
    specs: {
      type: "Aire",
      size: "Dual Tower",
      fans: "2x 140mm"
    }
  },
  {
    id: 31,
    name: "Arctic Liquid Freezer II 280",
    brand: "ARCTIC",
    category: "refrigeracion",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop",
    stock: 18,
    specs: {
      type: "Líquida AIO",
      size: "280mm",
      fans: "2x 140mm"
    }
  }
];

// Función helper para obtener productos por categoría
export const getProductsByCategory = (category) => {
  return productsDatabase.filter(product => product.category === category);
};

// Función helper para obtener todas las marcas de una categoría
export const getBrandsByCategory = (category) => {
  const products = getProductsByCategory(category);
  const brands = [...new Set(products.map(product => product.brand))];
  return brands.sort();
};

// Función helper para obtener un producto por ID
export const getProductById = (id) => {
  return productsDatabase.find(product => product.id === parseInt(id));
};