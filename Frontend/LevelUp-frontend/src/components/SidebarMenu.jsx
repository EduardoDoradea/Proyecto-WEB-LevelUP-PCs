import "../styles/sidebar.css";
import { useState } from "react";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✕
          </button>
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/arma-tu-pc">Arma tu PC</a>
          <a href="/ofertas">Ofertas</a>
          <a href="/contacto">Contacto</a>
        </div>
      </div>
      <button className="floating-menu" onClick={() => setIsOpen(true)}>
        ☰
      </button>
    </>
  );
}
