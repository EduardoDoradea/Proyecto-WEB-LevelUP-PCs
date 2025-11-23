import { useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import SidebarMenu from "../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../components/layout/Footer/Footer";
import "../styles/auth.css";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación cuando conectes el backend
    console.log("Login attempt:", formData);
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-header">
              <h1>Iniciar Sesión</h1>
              <p>Accede a tu cuenta de LevelUP PCs</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="/recuperar-contrasena" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="auth-btn">
                Iniciar Sesión
              </button>
            </form>

            <div className="auth-divider">
              <span>O</span>
            </div>

            <div className="auth-alternate">
              <p>¿No tienes una cuenta?</p>
              <a href="/registro" className="register-link">
                Regístrate aquí
              </a>
            </div>
          </div>

          <div className="auth-visual">
            <div className="visual-overlay"></div>
            <div className="visual-content">
              <h2>Bienvenido de vuelta</h2>
              <p>Accede a ofertas exclusivas y gestiona tus pedidos</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}