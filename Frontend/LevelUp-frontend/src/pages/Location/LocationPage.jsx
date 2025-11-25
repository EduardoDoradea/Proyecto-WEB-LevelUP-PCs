import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./location.css";

export default function LocationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      id: 1,
      name: "Tienda Principal - San Salvador",
      address: "Centro Comercial Multiplaza, Local 245",
      city: "San Salvador",
      phone: "+503 2222-3333",
      email: "sansalvador@leveluppc.com",
      hours: {
        weekdays: "Lunes a Viernes: 9:00 AM - 8:00 PM",
        saturday: "Sábado: 9:00 AM - 7:00 PM",
        sunday: "Domingo: 10:00 AM - 6:00 PM"
      },
      coordinates: "13.6929° N, 89.2182° W",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
      features: [
        "Showroom completo",
        "Servicio técnico especializado",
        "Ensamblaje personalizado",
        "Parking disponible"
      ]
    },
    {
      id: 2,
      name: "Sucursal Santa Tecla",
      address: "Plaza Merliot, Nivel 2, Local 312",
      city: "Santa Tecla",
      phone: "+503 2333-4444",
      email: "santatecla@leveluppc.com",
      hours: {
        weekdays: "Lunes a Viernes: 10:00 AM - 7:00 PM",
        saturday: "Sábado: 10:00 AM - 6:00 PM",
        sunday: "Domingo: 10:00 AM - 5:00 PM"
      },
      coordinates: "13.6764° N, 89.2794° W",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop",
      features: [
        "Asesoría personalizada",
        "Diagnóstico gratuito",
        "Servicio express",
        "Zona de gaming"
      ]
    },
    {
      id: 3,
      name: "Sucursal San Miguel",
      address: "Metrocentro San Miguel, Planta Baja",
      city: "San Miguel",
      phone: "+503 2444-5555",
      email: "sanmiguel@leveluppc.com",
      hours: {
        weekdays: "Lunes a Viernes: 9:00 AM - 7:00 PM",
        saturday: "Sábado: 9:00 AM - 6:00 PM",
        sunday: "Domingo: 9:00 AM - 5:00 PM"
      },
      coordinates: "13.4833° N, 88.1833° W",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=600&fit=crop",
      features: [
        "Atención al cliente premium",
        "Soporte técnico in-situ",
        "Catálogo completo",
        "Delivery local"
      ]
    }
  ];

  const currentLocation = locations[selectedLocation];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="location-page">
        {/* Hero Section */}
        <section className="location-hero">
          <div className="location-hero-overlay"></div>
          <div className="location-hero-content">
            <h1>Nuestras Ubicaciones</h1>
            <p>Visítanos en cualquiera de nuestras sucursales</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="location-container">
          {/* Location Selector */}
          <div className="location-selector">
            <h2>Selecciona una sucursal</h2>
            <div className="location-cards">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  className={`location-card ${selectedLocation === index ? 'active' : ''}`}
                  onClick={() => setSelectedLocation(index)}
                >
                  <div className="location-card-image">
                    <img src={location.image} alt={location.name} />
                  </div>
                  <div className="location-card-info">
                    <h3>{location.name}</h3>
                    <p>{location.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div className="location-details">
            <div className="location-main-image">
              <img src={currentLocation.image} alt={currentLocation.name} />
              <div className="location-badge">{currentLocation.city}</div>
            </div>

            <div className="location-info-grid">
              {/* Contact Info */}
              <div className="info-section">
                <h3>Información de Contacto</h3>
                <div className="info-items">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <div>
                      <strong>Dirección</strong>
                      <p>{currentLocation.address}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📞</span>
                    <div>
                      <strong>Teléfono</strong>
                      <p>{currentLocation.phone}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">✉️</span>
                    <div>
                      <strong>Email</strong>
                      <p>{currentLocation.email}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🌐</span>
                    <div>
                      <strong>Coordenadas</strong>
                      <p>{currentLocation.coordinates}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="info-section">
                <h3>Horario de Atención</h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span className="hour-days">Lunes a Viernes</span>
                    <span className="hour-time">
                      {currentLocation.hours.weekdays.split(': ')[1]}
                    </span>
                  </div>
                  <div className="hour-item">
                    <span className="hour-days">Sábado</span>
                    <span className="hour-time">
                      {currentLocation.hours.saturday.split(': ')[1]}
                    </span>
                  </div>
                  <div className="hour-item">
                    <span className="hour-days">Domingo</span>
                    <span className="hour-time">
                      {currentLocation.hours.sunday.split(': ')[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="info-section features-section">
                <h3>Servicios Disponibles</h3>
                <div className="features-grid">
                  {currentLocation.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="info-section map-section">
                <h3>Cómo Llegar</h3>
                <div className="map-placeholder">
                  <div className="map-overlay">
                    <span className="map-icon">📍</span>
                    <p>Ver ubicación en Google Maps</p>
                    <a 
                      href="https://maps.app.goo.gl/MqffreW6Uwnd1g397" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-btn"
                    >
                      Abrir Mapa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <section className="location-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Necesitas más información?</h2>
              <p>Contáctanos por WhatsApp o visítanos en cualquiera de nuestras sucursales</p>
              <div className="cta-buttons">
                <a href="https://wa.me/50374104232" className="cta-btn whatsapp">
                  <span>💬</span>
                  WhatsApp
                </a>
                <a href="tel:+50374104232" className="cta-btn phone">
                  <span>📞</span>
                  Llamar
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