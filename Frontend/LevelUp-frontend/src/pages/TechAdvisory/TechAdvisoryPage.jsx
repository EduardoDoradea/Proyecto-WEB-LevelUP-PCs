import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./techadvisory.css";

export default function TechAdvisoryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      id: 1,
      icon: "🎮",
      name: "Asesoría Gaming",
      duration: "Gratuita",
      color: "#00b4d8",
      description: "Te ayudamos a armar tu PC gaming ideal según tu presupuesto y juegos favoritos",
      includes: [
        "Análisis de requisitos de tus juegos",
        "Recomendación de componentes balanceados",
        "Optimización de presupuesto",
        "Proyección de rendimiento (FPS esperados)",
        "Verificación de compatibilidad total"
      ]
    },
    {
      id: 2,
      icon: "💼",
      name: "Asesoría Workstation",
      duration: "Gratuita",
      color: "#9333ea",
      description: "Configuración profesional para trabajo pesado: edición, diseño, 3D, programación",
      includes: [
        "Evaluación de software a utilizar",
        "Componentes optimizados para productividad",
        "Memoria y almacenamiento según carga de trabajo",
        "Balance rendimiento-fiabilidad",
        "Soluciones escalables a futuro"
      ]
    },
    {
      id: 3,
      icon: "🏢",
      name: "Asesoría Empresarial",
      duration: "Personalizada",
      color: "#ec4899",
      description: "Soluciones para empresas: servidores, estaciones de trabajo, infraestructura TI",
      includes: [
        "Análisis de necesidades empresariales",
        "Soluciones escalables y modulares",
        "Presupuestos para múltiples equipos",
        "Soporte post-venta dedicado",
        "Garantías extendidas disponibles"
      ]
    },
    {
      id: 4,
      icon: "⚡",
      name: "Upgrade y Mejoras",
      duration: "Gratuita",
      color: "#f59e0b",
      description: "Optimiza tu PC actual con las mejoras más efectivas según tu presupuesto",
      includes: [
        "Diagnóstico de tu sistema actual",
        "Identificación de cuellos de botella",
        "Recomendación de upgrades prioritarios",
        "Compatibilidad con componentes existentes",
        "Análisis costo-beneficio de cada mejora"
      ]
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Cuéntanos tus Necesidades",
      description: "Dinos para qué usarás tu PC: gaming, trabajo, edición, multitarea, etc.",
      icon: "💭"
    },
    {
      step: "02",
      title: "Define tu Presupuesto",
      description: "Establece un rango de inversión y te ayudamos a maximizar cada dólar",
      icon: "💰"
    },
    {
      step: "03",
      title: "Recibe Recomendaciones",
      description: "Te presentamos opciones personalizadas con justificación técnica de cada componente",
      icon: "📋"
    },
    {
      step: "04",
      title: "Ajustes y Optimización",
      description: "Refinamos la configuración hasta que estés 100% satisfecho",
      icon: "⚙️"
    }
  ];

  const benefits = [
    {
      icon: "🎯",
      title: "Configuración Balanceada",
      description: "Evita gastar de más en componentes que no aprovechas o crear cuellos de botella"
    },
    {
      icon: "✅",
      title: "Compatibilidad Garantizada",
      description: "Todos los componentes son verificados para funcionar perfectamente juntos"
    },
    {
      icon: "💡",
      title: "Optimización de Presupuesto",
      description: "Obtienes el máximo rendimiento posible según tu inversión"
    },
    {
      icon: "🔮",
      title: "Proyección a Futuro",
      description: "Configuraciones pensadas para upgrades futuros sin cambiar todo"
    },
    {
      icon: "🛡️",
      title: "Respaldo Técnico",
      description: "Soporte continuo incluso después de tu compra"
    },
    {
      icon: "📊",
      title: "Transparencia Total",
      description: "Explicamos cada decisión técnica de manera clara y comprensible"
    }
  ];

  const useCases = [
    {
      title: "Gaming Competitivo",
      specs: "144+ FPS en eSports",
      budget: "Desde $800",
      focus: "CPU rápido, GPU equilibrada, monitor de alta tasa de refresco"
    },
    {
      title: "Gaming 4K/Ultra",
      specs: "4K 60 FPS máximos detalles",
      budget: "Desde $1,500",
      focus: "GPU de gama alta, CPU potente, 32GB RAM"
    },
    {
      title: "Edición de Video",
      specs: "4K/8K, After Effects, Premiere",
      budget: "Desde $1,200",
      focus: "CPU multi-core, 32GB+ RAM, almacenamiento rápido"
    },
    {
      title: "Diseño 3D/Renderizado",
      specs: "Blender, Cinema 4D, Maya",
      budget: "Desde $1,400",
      focus: "GPU para render, CPU potente, RAM abundante"
    },
    {
      title: "Programación/Dev",
      specs: "IDEs, compilación, virtualización",
      budget: "Desde $700",
      focus: "CPU eficiente, 16GB+ RAM, SSD rápido"
    },
    {
      title: "Streaming",
      specs: "Gaming + transmisión simultánea",
      budget: "Desde $1,000",
      focus: "CPU multi-core, GPU dual, buena conectividad"
    }
  ];

  const channels = [
    {
      icon: "💬",
      method: "WhatsApp",
      info: "+503 7777-8888",
      availability: "Lun-Dom 9AM-8PM",
      response: "Respuesta inmediata",
      link: "https://wa.me/50377778888"
    },
    {
      icon: "📧",
      method: "Email",
      info: "asesoria@leveluppc.com",
      availability: "24/7",
      response: "Dentro de 24 horas",
      link: "mailto:asesoria@leveluppc.com"
    },
    {
      icon: "📞",
      method: "Teléfono",
      info: "+503 2222-3333",
      availability: "Lun-Vie 9AM-8PM",
      response: "Atención en vivo",
      link: "tel:+50322223333"
    },
    {
      icon: "🏪",
      method: "Presencial",
      info: "3 sucursales",
      availability: "Ver horarios",
      response: "Asesoría cara a cara",
      link: "/nosotros/ubicación"
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="advisory-page">
        {/* Hero Section */}
        <section className="advisory-hero">
          <div className="advisory-hero-overlay"></div>
          <div className="advisory-hero-content">
            <h1>Asesoría Técnica</h1>
            <p>Expertos a tu servicio, sin costo</p>
          </div>
        </section>

        {/* Intro */}
        <section className="advisory-intro">
          <div className="advisory-container">
            <div className="intro-content">
              <span className="section-label">Servicio Gratuito</span>
              <h2>Te Ayudamos a Tomar la Mejor Decisión</h2>
              <p>
                Armar una PC puede ser abrumador con tantas opciones. Nuestro equipo de expertos 
                está aquí para guiarte en cada paso: desde elegir componentes compatibles hasta 
                optimizar tu presupuesto y asegurar que obtengas el rendimiento que necesitas.
              </p>
              <p>
                Ya sea que busques una PC para gaming, trabajo profesional, o simplemente quieras 
                mejorar tu equipo actual, te ofrecemos asesoría personalizada completamente gratuita.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="advisory-services">
          <div className="advisory-container">
            <div className="section-header">
              <span className="section-label">Especialidades</span>
              <h2>Tipos de Asesoría</h2>
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
                      <span className="service-duration">{service.duration}</span>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="advisory-process">
          <div className="advisory-container">
            <div className="section-header">
              <span className="section-label">Proceso</span>
              <h2>¿Cómo Funciona?</h2>
            </div>

            <div className="process-grid">
              {howItWorks.map((item, index) => (
                <div key={index} className="process-card">
                  <div className="process-icon">{item.icon}</div>
                  <div className="process-step">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="advisory-benefits">
          <div className="advisory-container">
            <div className="section-header">
              <span className="section-label">Ventajas</span>
              <h2>¿Por Qué Usar Nuestra Asesoría?</h2>
            </div>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="advisory-cases">
          <div className="advisory-container">
            <div className="section-header">
              <span className="section-label">Ejemplos</span>
              <h2>Casos de Uso Comunes</h2>
              <p>Algunas de las configuraciones más solicitadas</p>
            </div>

            <div className="cases-grid">
              {useCases.map((useCase, index) => (
                <div key={index} className="case-card">
                  <h3>{useCase.title}</h3>
                  <div className="case-specs">
                    <span className="case-label">Objetivo:</span>
                    <span className="case-value">{useCase.specs}</span>
                  </div>
                  <div className="case-budget">
                    <span className="case-label">Presupuesto:</span>
                    <span className="case-value">{useCase.budget}</span>
                  </div>
                  <div className="case-focus">
                    <span className="focus-label">Enfoque:</span>
                    <p>{useCase.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="advisory-channels">
          <div className="advisory-container">
            <div className="section-header">
              <span className="section-label">Contacto</span>
              <h2>Canales de Asesoría</h2>
              <p>Elige el medio que más te convenga</p>
            </div>

            <div className="channels-grid">
              {channels.map((channel, index) => (
                <a 
                  key={index} 
                  href={channel.link}
                  className="channel-card"
                  target={channel.link.startsWith('http') ? '_blank' : '_self'}
                  rel={channel.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="channel-icon">{channel.icon}</div>
                  <h3>{channel.method}</h3>
                  <p className="channel-info">{channel.info}</p>
                  <div className="channel-details">
                    <div className="channel-detail">
                      <span className="detail-label">Disponibilidad:</span>
                      <span className="detail-value">{channel.availability}</span>
                    </div>
                    <div className="channel-detail">
                      <span className="detail-label">Respuesta:</span>
                      <span className="detail-value highlight">{channel.response}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="advisory-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Listo para Armar tu PC Ideal?</h2>
              <p>Contáctanos ahora y recibe asesoría personalizada sin ningún compromiso</p>
              <div className="cta-buttons">
                <a href="https://wa.me/50377778888" className="cta-btn primary" target="_blank" rel="noopener noreferrer">
                  <span>💬</span>
                  Iniciar Asesoría
                </a>
                <a href="/componentes" className="cta-btn secondary">
                  Ver Catálogo
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