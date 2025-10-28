import "../styles/navbar.css";
import logo from "../assets/logo.svg";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="LevelUP PCs" className="navbar-logo" />
        <nav className="navbar-links">
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/arma-tu-pc">Arma tu PC</a>
          <a href="/ofertas">Ofertas</a>
          <a href="/contacto">Contacto</a>
        </nav>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
