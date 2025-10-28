import "../styles/navbar.css";
import logo from "../assets/logo.svg";

export default function Navbar({ onMenuToggle }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <button className="menu-burger" onClick={onMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <a href="/" className="navbar-logo-link">
          <img src={logo} alt="LevelUP PCs" className="navbar-logo" />
        </a>
        
        <div className="navbar-actions">
          <button className="btn-user" title="Iniciar Sesión">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button className="btn-cart" title="Carrito de Compras">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}