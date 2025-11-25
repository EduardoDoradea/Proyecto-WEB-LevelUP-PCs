import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./profile.css";

export default function UserProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay usuario logueado
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userData");

    if (!token || !user) {
      // Si no hay sesión, redirigir al login
      navigate("/login");
      return;
    }

    try {
      setUserData(JSON.parse(user));
    } catch (error) {
      console.error("Error al parsear datos de usuario:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  if (!userData) {
    return null; // O un loading spinner
  }

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="profile-page">
        {/* Hero Section */}
        <section className="profile-hero">
          <div className="profile-hero-overlay"></div>
          <div className="profile-hero-content">
            <div className="profile-avatar">
              <span>{userData.nombre?.charAt(0) || 'U'}</span>
            </div>
            <h1>Hola, {userData.nombre}</h1>
            <p>Bienvenido a tu cuenta de LevelUP PCs</p>
          </div>
        </section>

        {/* Profile Content */}
        <div className="profile-container">
          {/* Tabs Navigation */}
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <span>👤</span>
              Información Personal
            </button>
            <button
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span>📦</span>
              Mis Pedidos
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span>⚙️</span>
              Configuración
            </button>
          </div>

          {/* Tab Content */}
          <div className="profile-content">
            {activeTab === 'info' && (
              <div className="info-section">
                <h2>Información Personal</h2>
                
                <div className="info-grid">
                  <div className="info-card">
                    <div className="info-label">Nombre Completo</div>
                    <div className="info-value">{userData.nombre || 'No especificado'}</div>
                  </div>

                  <div className="info-card">
                    <div className="info-label">Apodo de Usuario</div>
                    <div className="info-value">{userData.apodo || 'No especificado'}</div>
                  </div>

                  <div className="info-card">
                    <div className="info-label">Correo Electrónico</div>
                    <div className="info-value">{userData.email || 'No especificado'}</div>
                  </div>

                  <div className="info-card">
                    <div className="info-label">Teléfono</div>
                    <div className="info-value">{userData.telefono || 'No especificado'}</div>
                  </div>

                  <div className="info-card full-width">
                    <div className="info-label">Miembro desde</div>
                    <div className="info-value">
                      {userData.createdAt 
                        ? new Date(userData.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'No disponible'
                      }
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn-edit">
                    <span>✏️</span>
                    Editar Información
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>Mis Pedidos</h2>
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No tienes pedidos aún</h3>
                  <p>Cuando realices una compra, aparecerá aquí</p>
                  <a href="/componentes" className="btn-shop">
                    Explorar Productos
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2>Configuración de Cuenta</h2>
                
                <div className="settings-group">
                  <h3>Seguridad</h3>
                  <button className="setting-item">
                    <div className="setting-info">
                      <span className="setting-icon">🔒</span>
                      <div>
                        <div className="setting-title">Cambiar Contraseña</div>
                        <div className="setting-desc">Actualiza tu contraseña periódicamente</div>
                      </div>
                    </div>
                    <span className="setting-arrow">›</span>
                  </button>
                </div>

                <div className="settings-group">
                  <h3>Preferencias</h3>
                  <button className="setting-item">
                    <div className="setting-info">
                      <span className="setting-icon">📧</span>
                      <div>
                        <div className="setting-title">Notificaciones por Email</div>
                        <div className="setting-desc">Recibe ofertas y novedades</div>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </button>
                </div>

                <div className="settings-group danger-zone">
                  <h3>Zona de Peligro</h3>
                  <button className="setting-item danger" onClick={handleLogout}>
                    <div className="setting-info">
                      <span className="setting-icon">🚪</span>
                      <div>
                        <div className="setting-title">Cerrar Sesión</div>
                        <div className="setting-desc">Salir de tu cuenta</div>
                      </div>
                    </div>
                    <span className="setting-arrow">›</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
