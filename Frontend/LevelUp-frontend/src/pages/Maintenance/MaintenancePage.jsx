import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./maintenance.css";

export default function MaintenancePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      id: 1,
      icon: "🧹",
      name: "Limpieza Básica",
      duration: "30-45 min",
      price: "$15.00",
      color: "#00b4d8",
      description: "Limpieza externa e interna del gabinete, remoción de polvo superficial",
      includes: [
        "Limpieza de gabinete externo",
        "Remoción de polvo con aire comprimido",
        "Limpieza de ventiladores accesibles",
        "Inspección visual general"
      ]
    },
    {
      id: 2,
      icon: "🔧",
      name: "Mantenimiento Preventivo",
      duration: "1-2 horas",
      price: "$35.00",
      color: "#9333ea",
      description: "Limpieza profunda, cambio de pasta térmica y optimización del sistema",
      includes: [
        "Todo lo de Limpieza Básica",
        "Desmontaje de componentes principales",
        "Cambio de pasta térmica (CPU y GPU)",
        "Limpieza profunda de disipadores",
        "Verificación de conexiones",
        "Pruebas de temperatura",
        "Optimización de cables"
      ]
    },
    {
      id: 3,
      icon: "⚡",
      name: "Mantenimiento Premium",
      duration: "2-3 horas",
      price: "$60.00",
      color: "#ec4899",
      description: "Servicio completo con diagnóstico avanzado y optimización total del sistema",
      includes: [
        "Todo lo de Mantenimiento Preventivo",
        "Diagnóstico completo de hardware",
        "Actualización de BIOS",
        "Actualización de drivers",
        "Limpieza de sistema operativo",
        "Optimización de rendimiento",
        "Benchmarks antes y después",
        "Informe detallado del estado del PC"
      ]
    },
    {
      id: 4,
      icon: "💧",
      name: "Mantenimiento Sistema Líquido",
      duration: "3-4 horas",
      price: "$80.00",
      color: "#06b6d4",
      description: "Especializado para sistemas de refrigeración líquida AIO y custom loops",
      includes: [
        "Inspección completa del sistema",
        "Verificación de fugas",
        "Limpieza de radiadores",
        "Revisión de bomba y flujo",
        "Cambio de líquido refrigerante (si aplica)",
        "Pruebas de presión",
        "Optimización de temperaturas"
      ]
    }
  ];

  const reasons = [
    {
      icon: "❄️",
      title: "Temperaturas Óptimas",
      description: "Evita sobrecalentamiento y mejora el rendimiento general del sistema"
    },
    {
      icon: "⏱️",
      title: "Mayor Vida Útil",
      description: "Prolonga la durabilidad de todos tus componentes"
    },
    {
      icon: "🚀",
      title: "Mejor Rendimiento",
      description: "Mantén tu PC funcionando como el primer día"
    },
    {
      icon: "🔇",
      title: "Reducción de Ruido",
      description: "Ventiladores limpios operan más silenciosamente"
    }
  ];

  const recommendations = [
    {
      frequency: "Cada 3-4 meses",
      type: "Limpieza Básica",
      description: "Para uso regular en ambientes normales"
    },
    {
      frequency: "Cada 6 meses",
      type: "Mantenimiento Preventivo",
      description: "Recomendado para gaming y workstations"
    },
    {
      frequency: "Anual",
      type: "Mantenimiento Premium",
      description: "Ideal para equipos de alto rendimiento"
    },
    {
      frequency: "Cada 12-18 meses",
      type: "Sistema Líquido",
      description: "Obligatorio para refrigeración líquida"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Diagnóstico Inicial",
      description: "Evaluamos el estado actual de tu PC y determinamos el tipo de mantenimiento necesario"
    },
    {
      step: "02",
      title: "Desmontaje y Limpieza",
      description: "Desmontamos los componentes necesarios según el servicio seleccionado"
    },
    {
      step: "03",
      title: "Mantenimiento Específico",
      description: "Realizamos las tareas correspondientes: limpieza, cambio de pasta, optimización"
    },
    {
      step: "04",
      title: "Ensamblaje y Pruebas",
      description: "Reensamblamos todo y realizamos pruebas exhaustivas para garantizar el funcionamiento óptimo"
    }
  ];

  const warnings = [
    "No intentes abrir tu PC si está en garantía del fabricante",
    "Los sistemas líquidos custom requieren mantenimiento especializado",
    "No uses líquidos de limpieza domésticos en componentes electrónicos",
    "El polvo acumulado puede causar cortocircuitos y sobrecalentamiento",
    "Cambiar pasta térmica incorrectamente puede dañar tu CPU/GPU"
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="maintenance-page">
        {/* Hero Section */}
        <section className="maintenance-hero">
          <div className="maintenance-hero-overlay"></div>
          <div className="maintenance-hero-content">
            <h1>Mantenimiento Profesional</h1>
            <p>Mantén tu PC en condiciones óptimas</p>
          </div>
        </section>

        {/* Intro */}
        <section className="maintenance-intro">
          <div className="maintenance-container">
            <div className="intro-content">
              <span className="section-label">Nuestro Servicio</span>
              <h2>¿Por Qué es Importante el Mantenimiento?</h2>
              <p>
                Un PC sin mantenimiento acumula polvo, sufre sobrecalentamiento y pierde rendimiento. 
                Nuestros técnicos especializados realizan limpiezas profundas y optimizaciones para 
                garantizar que tu equipo funcione como nuevo.
              </p>
              <p>
                Desde limpieza básica hasta mantenimiento de sistemas de refrigeración líquida, 
                ofrecemos servicios adaptados a las necesidades de tu configuración.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="maintenance-services">
          <div className="maintenance-container">
            <div className="section-header">
              <span className="section-label">Servicios</span>
              <h2>Nuestros Planes de Mantenimiento</h2>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="service-card"
                  style={{ '--service-color': service.color }}
                >
                  <div className="service-header">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <div className="service-meta">
                        <span className="service-duration">⏱️ {service.duration}</span>
                        <span className="service-price">{service.price}</span>
                      </div>
                    </div>
                  </div>

                  <p className="service-description">{service.description}</p>

                  <div className="service-includes">
                    <h4>Incluye:</h4>
                    <ul>
                      {service.includes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="service-btn">Agendar Servicio</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section className="maintenance-reasons">
          <div className="maintenance-container">
            <div className="section-header">
              <span className="section-label">Beneficios</span>
              <h2>¿Por Qué Mantener tu PC?</h2>
            </div>

            <div className="reasons-grid">
              {reasons.map((reason, index) => (
                <div key={index} className="reason-card">
                  <div className="reason-icon">{reason.icon}</div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="maintenance-recommendations">
          <div className="maintenance-container">
            <div className="section-header">
              <span className="section-label">Frecuencia</span>
              <h2>¿Cada Cuánto Debo Hacer Mantenimiento?</h2>
            </div>

            <div className="recommendations-list">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <div className="rec-frequency">{rec.frequency}</div>
                  <div className="rec-content">
                    <h3>{rec.type}</h3>
                    <p>{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="maintenance-process">
          <div className="maintenance-container">
            <div className="section-header">
              <span className="section-label">Procedimiento</span>
              <h2>Nuestro Proceso de Trabajo</h2>
            </div>

            <div className="process-grid">
              {process.map((item, index) => (
                <div key={index} className="process-card">
                  <div className="process-step">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warnings */}
        <section className="maintenance-warnings">
          <div className="maintenance-container">
            <div className="warnings-content">
              <div className="warnings-header">
                <span className="warning-icon">⚠️</span>
                <h2>Advertencias Importantes</h2>
                <p>Ten en cuenta estas consideraciones antes de manipular tu PC</p>
              </div>

              <div className="warnings-list">
                {warnings.map((warning, index) => (
                  <div key={index} className="warning-item">
                    <span className="warning-bullet">!</span>
                    <p>{warning}</p>
                  </div>
                ))}
              </div>

              <div className="warnings-footer">
                <p>
                  <strong>Recomendación:</strong> Si no tienes experiencia técnica, 
                  es mejor dejar el mantenimiento en manos de profesionales para evitar 
                  daños a tus componentes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="maintenance-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Listo para Darle Mantenimiento a tu PC?</h2>
              <p>Agenda una cita o visítanos directamente en cualquiera de nuestras sucursales</p>
              <div className="cta-buttons">
                <a href="/nosotros/contacto" className="cta-btn primary">
                  Agendar Cita
                </a>
                <a href="/nosotros/ubicación" className="cta-btn secondary">
                  Ver Ubicaciones
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