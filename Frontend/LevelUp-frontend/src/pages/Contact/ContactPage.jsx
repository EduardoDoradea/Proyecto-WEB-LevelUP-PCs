import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./contact.css";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const contactMethods = [
    {
      icon: "📞",
      title: "Llámanos",
      info: "+503 2222-3333",
      description: "Lun - Vie: 9:00 AM - 8:00 PM",
      link: "tel:+50322223333"
    },
    {
      icon: "📧",
      title: "Email",
      info: "info@leveluppc.com",
      description: "Respuesta en 24 horas",
      link: "mailto:info@leveluppc.com"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      info: "+503 7777-8888",
      description: "Atención inmediata",
      link: "https://wa.me/50377778888"
    },
    {
      icon: "📍",
      title: "Ubicación",
      info: "San Salvador, El Salvador",
      description: "Ver todas las sucursales",
      link: "/nosotros/ubicación"
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-overlay"></div>
          <div className="contact-hero-content">
            <h1>Contáctanos</h1>
            <p>Estamos aquí para ayudarte</p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="contact-methods">
          <div className="contact-container">
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <a 
                  key={index} 
                  href={method.link}
                  className="method-card"
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p className="method-info">{method.info}</p>
                  <p className="method-description">{method.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="contact-info-section">
          <div className="contact-container">
            <div className="info-main-grid">
              {/* Business Hours */}
              <div className="info-card-large">
                <div className="card-icon">🕒</div>
                <h2>Horarios de Atención</h2>
                <div className="hours-list">
                  <div className="hour-item">
                    <span>Lunes - Viernes</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Sábado</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Domingo</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="info-card-large">
                <div className="card-icon">🔗</div>
                <h2>Enlaces Rápidos</h2>
                <div className="quick-links">
                  <a href="/catalogo">
                    <span>→</span>
                    Ver Catálogo
                  </a>
                  <a href="/nosotros/ubicación">
                    <span>→</span>
                    Nuestras Tiendas
                  </a>
                  <a href="/nosotros/quiénes-somos">
                    <span>→</span>
                    Sobre Nosotros
                  </a>
                  <a href="/carrito">
                    <span>→</span>
                    Mi Carrito
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="contact-social">
          <div className="contact-container">
            <div className="social-header">
              <span className="section-label">Síguenos</span>
              <h2>Conéctate con Nosotros</h2>
              <p>Mantente al día con nuestras ofertas y novedades</p>
            </div>

            <div className="social-grid">
              <a href="#" className="social-card facebook" target="_blank" rel="noopener noreferrer">
                <div className="social-card-icon">f</div>
                <h3>Facebook</h3>
                <p>Síguenos en Facebook</p>
                <span className="social-arrow">→</span>
              </a>

              <a href="#" className="social-card instagram" target="_blank" rel="noopener noreferrer">
                <div className="social-card-icon">📷</div>
                <h3>Instagram</h3>
                <p>Fotos y stories diarias</p>
                <span className="social-arrow">→</span>
              </a>

              <a href="#" className="social-card twitter" target="_blank" rel="noopener noreferrer">
                <div className="social-card-icon">𝕏</div>
                <h3>Twitter</h3>
                <p>Últimas noticias</p>
                <span className="social-arrow">→</span>
              </a>

              <a href="#" className="social-card youtube" target="_blank" rel="noopener noreferrer">
                <div className="social-card-icon">▶</div>
                <h3>YouTube</h3>
                <p>Tutoriales y reviews</p>
                <span className="social-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Listo para contactarnos?</h2>
              <p>Nuestro equipo está disponible para ayudarte con cualquier consulta</p>
              <div className="cta-buttons">
                <a href="tel:+50322223333" className="cta-btn phone">
                  <span>📞</span>
                  Llamar Ahora
                </a>
                <a href="https://wa.me/50377778888" className="cta-btn whatsapp" target="_blank" rel="noopener noreferrer">
                  <span>💬</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}