import { useState } from "react";
import Navbar from "../../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../../components/layout/Footer/Footer";
import "../LoginPage/auth.css";

export default function RegisterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    acceptTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    // Aquí irá la lógica de registro cuando conectes el backend
    console.log("Register attempt:", formData);
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <div className="auth-container">
        <div className="auth-wrapper register-wrapper">
          <div className="auth-visual">
            <div className="visual-overlay"></div>
            <div className="visual-content">
              <h2>Únete a LevelUP</h2>
              <p>Crea tu cuenta y empieza a armar tu PC ideal</p>
            </div>
          </div>

          <div className="auth-content">
            <div className="auth-header">
              <h1>Crear Cuenta</h1>
              <p>Regístrate en LevelUP PCs</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="telefono">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+503 1234-5678"
                />
              </div>

              <div className="form-row">
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
                    minLength="8"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength="8"
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    Acepto los{" "}
                    <a href="/terminos" className="terms-link">
                      términos y condiciones
                    </a>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-btn">
                Crear Cuenta
              </button>
            </form>

            <div className="auth-divider">
              <span>O</span>
            </div>

            <div className="auth-alternate">
              <p>¿Ya tienes una cuenta?</p>
              <a href="/login" className="register-link">
                Inicia sesión aquí
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}