import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. IMPORTANTE: Importar navegación
import Navbar from "../../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../../components/layout/Footer/Footer";
import api from "../../../utils/api.js";
import "./auth.css";

export default function LoginPage() {
  const navigate = useNavigate(); // 2. Inicializar el hook de navegación
  const [menuOpen, setMenuOpen] = useState(false);

  // Estados para manejo de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null); // Limpiar error al escribir
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const datosLogin = {
        correo: formData.email, 
        password: formData.password
      };

      console.log("Enviando datos al backend:", datosLogin);

      const response = await api.post("/api/clientes/iniciarSesionCliente", datosLogin);

      console.log("Respuesta del servidor:", response.data);

      const token = response.data.token || response.data.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        
        console.log("Login exitoso, redirigiendo...");
        navigate("/"); 
      } else {
        throw new Error("El servidor respondió pero no envió un token.");
      }

    } catch (err) {
      console.error("Error completo:", err);
      
      const errorMsg = 
        err.response?.data?.message || 
        err.response?.data?.error ||   
        err.message ||                 
        "Error al iniciar sesión.";
        
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
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-header">
              <h1>Iniciar Sesión</h1>
              <p>Accede a tu cuenta de LevelUP PCs</p>
            </div>

            {/* --- 3. PARTE VISUAL CORREGIDA: Mensaje de Error --- */}
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
                  disabled={loading} // Bloquear input si carga
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
                  disabled={loading} // Bloquear input si carga
                />
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" disabled={loading} />
                  <span>Recordarme</span>
                </label>
                <a href="/recuperar-contrasena" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón con estado de carga */}
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Conectando..." : "Iniciar Sesión"}
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