import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../../components/layout/Footer/Footer";
import api from "../../../utils/api.js";
import "./auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Verificar si ya hay sesión activa
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Solo redirigir si hay token Y no es la primera carga del login
    if (token) {
      // Validar que el token sea válido llamando al backend
      const validarToken = async () => {
        try {
          await api.get("/api/clientes/verificarToken"); // Ajusta la ruta según tu backend
          navigate("/"); // Si el token es válido, ir a home
        } catch (err) {
          // Si el token no es válido, limpiar y permitir login
          localStorage.removeItem("token");
          console.log("Token inválido, permitiendo login");
        }
      };
      validarToken();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
        console.log("Token guardado:", token);
        
        setTimeout(() => {
          console.log("Login exitoso, redirigiendo...");
          navigate("/"); 
        }, 100);
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
                  disabled={loading}
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
                  disabled={loading}
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