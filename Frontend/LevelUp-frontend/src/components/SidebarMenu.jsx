import "../styles/sidebar.css";
import { useState } from "react";

export default function SidebarMenu({ isOpen, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const menuItems = [
    {
      title: "Componentes",
      icon: "🖥️",
      subitems: [
        "Procesadores", 
        "Tarjetas Gráficas", 
        "Memoria RAM", 
        "Almacenamiento", 
        "Placas Madre",
        "Fuentes de Poder",
        "Gabinetes",
        "Refrigeración"
      ]
    },
    {
      title: "Arma tu PC",
      icon: "⚙️",
      subitems: [
        "Configurador Pieza por Pieza", 
        "Guía de Compatibilidad",
        "Calculadora de Watts"
      ]
    },
    {
      title: "Ofertas Flash",
      icon: "⚡",
      subitems: [
        "Descuentos del Día", 
        "Liquidación", 
        "Ofertas por Categoría"
      ]
    },
    {
      title: "Soporte",
      icon: "🛠️",
      subitems: [
        "Garantías", 
        "Instalación y Ensamblaje", 
        "Mantenimiento", 
        "FAQ",
        "Asesoría Técnica"
      ]
    },
    {
      title: "Nosotros",
      icon: "ℹ️",
      subitems: [
        "Quiénes Somos", 
        "Ubicación", 
        "Contacto",
        "Políticas de Envío"
      ]
    }
  ];

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleItemClick = (item, index) => {
    if (item.link) {
      // Si tiene un link directo, navegar
      window.location.href = item.link;
    } else {
      // Si no, expandir/colapsar subitems
      toggleItem(index);
    }
  };

  return (
    <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className={`sidebar ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="sidebar-close" onClick={onClose}>✕</button>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div key={index} className="sidebar-item">
              <button 
                className={`sidebar-link ${expandedItem === index ? "active" : ""}`}
                onClick={() => handleItemClick(item, index)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.title}</span>
                {!item.link && <span className="sidebar-arrow">›</span>}
              </button>
              
              {!item.link && (
                <div className={`sidebar-submenu ${expandedItem === index ? "expanded" : ""}`}>
                  {item.subitems.map((subitem, subIndex) => (
                    <a 
                      key={subIndex} 
                      href={`/${item.title.toLowerCase().replace(/ /g, '-')}/${subitem.toLowerCase().replace(/ /g, '-')}`} 
                      className="sidebar-sublink"
                    >
                      {subitem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}