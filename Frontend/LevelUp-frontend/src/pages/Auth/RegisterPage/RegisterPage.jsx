import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../../components/layout/Footer/Footer";
import api from "../../../utils/api.js"; 
import "../LoginPage/auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estados de carga y error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    apodo: "",
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
    if (error) setError(null);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4, 8);
    }
    setFormData({ ...formData, telefono: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, acceptTerms, ...datosBase } = formData;

    const datosParaBackend = {
        nombre: datosBase.nombre,
        nombreUsuario: datosBase.apodo,
        correo: datosBase.email, 
        password: datosBase.password,
        telefono: parseInt(datosBase.telefono.replace(/-/g, ""), 10) // Limpiamos el guion
      };
      await api.post("/api/clientes/registroCliente", datosParaBackend);

      console.log("Registro exitoso");
      navigate("/login"); 
      
    } catch (err) {
      console.error("Error de registro:", err);
      const errorMsg = err.response?.data?.message || "Error al intentar registrarse. Intenta nuevamente.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
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

            {/* Mensaje de Error */}
            {error && (
              <div style={{ 
                backgroundColor: "#ffebee", 
                color: "#c62828", 
                padding: "10px", 
                borderRadius: "4px", 
                marginBottom: "15px",
                textAlign: "center",
                fontSize: "0.9rem"
              }}>
                {error}
              </div>
            )}

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
                    placeholder="Tu nombre completo"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apodo">Apodo de usuario</label>
                  <input
                    type="text"
                    id="apodo"
                    name="apodo"
                    value={formData.apodo}
                    onChange={handleChange}
                    placeholder="Tu apodo de usuario"
                    required
                    disabled={loading}
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
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  placeholder="1234-5678"
                  required
                  disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <span>
                    Acepto los{" "}
                    <a href="/terminos" className="terms-link">
                      términos y condiciones
                    </a>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
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