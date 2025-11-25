import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import api from "../../utils/api.js";
import "../Auth/LoginPage/auth.css"; // Reutilizamos estilos para consistencia

export default function UserProfile() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Asumimos que crearemos esta ruta en el backend
        const response = await api.get("/api/clientes/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserData(response.data);
      } catch (err) {
        setError("No se pudieron cargar los datos del usuario.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="auth-container">
        <div className="auth-wrapper">
          {/* Panel Visual Izquierdo (Reutilizado) */}
          <div className="auth-visual">
            <div className="visual-overlay"></div>
            <div className="visual-content">
              <h2>Tu Espacio</h2>
              <p>Gestiona tu información personal y pedidos</p>
            </div>
          </div>

          {/* Panel de Contenido Derecho */}
          <div className="auth-content">
            <div className="auth-header">
              <h1>Mi Perfil</h1>
              <p>Información de tu cuenta LevelUP</p>
            </div>

            {loading ? (
              <p style={{color: "#fff"}}>Cargando información...</p>
            ) : error ? (
               <div style={{ color: "#c62828", background: "#ffebee", padding: "10px", borderRadius: "4px" }}>
                 {error}
               </div>
            ) : (
              <div className="auth-form">
                {/* Mostramos los datos en campos de solo lectura para mantener el estilo */}
                
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" value={userData?.nombre || ""} disabled />
                </div>

                <div className="form-group">
                  <label>Apodo (Usuario)</label>
                  <input type="text" value={userData?.nombreUsuario || ""} disabled />
                </div>

                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" value={userData?.correo || ""} disabled />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="text" value={userData?.telefono || ""} disabled />
                </div>

                <button className="auth-btn" onClick={() => console.log("Ir a editar")}>
                  Editar Información
                </button>
                
                <button 
                  className="auth-btn" 
                  style={{ background: "transparent", border: "1px solid #c62828", marginTop: "10px" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}