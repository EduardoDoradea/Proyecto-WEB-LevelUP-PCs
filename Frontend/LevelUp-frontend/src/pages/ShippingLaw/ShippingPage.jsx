import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./shipping.css";

export default function ShippingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const shippingZones = [
    {
      zone: "San Salvador y Área Metropolitana",
      time: "24-48 horas",
      cost: "Gratis en compras mayores a $50",
      regularCost: "$5.00"
    },
    {
      zone: "Zona Occidental (Santa Ana, Sonsonate, Ahuachapán)",
      time: "2-3 días hábiles",
      cost: "Gratis en compras mayores a $100",
      regularCost: "$8.00"
    },
    {
      zone: "Zona Oriental (San Miguel, Usulután, La Unión)",
      time: "2-3 días hábiles",
      cost: "Gratis en compras mayores a $100",
      regularCost: "$8.00"
    },
    {
      zone: "Zona Paracentral (La Paz, Cuscatlán, Cabañas)",
      time: "2-3 días hábiles",
      cost: "Gratis en compras mayores a $75",
      regularCost: "$6.00"
    }
  ];

  const features = [
    {
      icon: "📦",
      title: "Empaque Seguro",
      description: "Todos los componentes son empacados con materiales antiestáticos y acolchados para garantizar su integridad."
    },
    {
      icon: "🔒",
      title: "Seguro de Envío",
      description: "Todos los pedidos incluyen seguro contra daños o pérdidas durante el transporte."
    },
    {
      icon: "📍",
      title: "Rastreo en Tiempo Real",
      description: "Recibe un código de rastreo para seguir tu pedido en cada etapa del envío."
    },
    {
      icon: "✅",
      title: "Inspección al Recibir",
      description: "Tienes derecho a inspeccionar el paquete antes de firmar la recepción del pedido."
    }
  ];

  const policies = [
    {
      title: "Procesamiento de Pedidos",
      items: [
        "Los pedidos realizados antes de las 2:00 PM se procesan el mismo día",
        "Pedidos posteriores a las 2:00 PM se procesan al siguiente día hábil",
        "Los pedidos de fin de semana se procesan los lunes",
        "Recibirás confirmación por email con los detalles de tu pedido"
      ]
    },
    {
      title: "Métodos de Envío",
      items: [
        "Envío estándar: 2-4 días hábiles",
        "Envío express: 24-48 horas (disponible en área metropolitana)",
        "Retiro en tienda: Disponible en todas nuestras sucursales sin costo",
        "Para productos especiales, el tiempo puede variar"
      ]
    },
    {
      title: "Condiciones del Envío",
      items: [
        "Es necesario que haya una persona mayor de edad para recibir el pedido",
        "Se requiere presentar DUI o documento de identidad",
        "Si no hay nadie disponible, se dejará un aviso para reagendar",
        "El destinatario debe verificar el estado del paquete antes de firmar"
      ]
    },
    {
      title: "Productos de Alto Valor",
      items: [
        "Para pedidos superiores a $500, se requiere firma de recibido",
        "Pueden requerir verificación adicional de identidad",
        "Se entrega únicamente al titular del pedido o persona autorizada",
        "Incluyen seguro premium automáticamente"
      ]
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="shipping-page">
        {/* Hero Section */}
        <section className="shipping-hero">
          <div className="shipping-hero-overlay"></div>
          <div className="shipping-hero-content">
            <h1>Política de Envío</h1>
            <p>Entrega segura a todo El Salvador</p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="shipping-intro">
          <div className="shipping-container">
            <div className="intro-content">
              <span className="section-label">Información General</span>
              <h2>Envíos Seguros y Confiables</h2>
              <p>
                En LevelUP PCs nos comprometemos a entregar tus componentes de manera segura y puntual. 
                Trabajamos con las mejores empresas de mensajería para garantizar que tu pedido llegue 
                en perfecto estado, sin importar donde te encuentres en El Salvador.
              </p>
              <p>
                Cada producto es cuidadosamente empacado con materiales especializados para proteger 
                los componentes electrónicos durante el transporte. Tu inversión tecnológica está 
                asegurada desde nuestro almacén hasta tu puerta.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="shipping-zones">
          <div className="shipping-container">
            <div className="section-header">
              <span className="section-label">Cobertura</span>
              <h2>Zonas de Envío</h2>
              <p>Consulta los tiempos y costos según tu ubicación</p>
            </div>

            <div className="zones-grid">
              {shippingZones.map((zone, index) => (
                <div key={index} className="zone-card">
                  <div className="zone-header">
                    <span className="zone-icon">📍</span>
                    <h3>{zone.zone}</h3>
                  </div>
                  <div className="zone-details">
                    <div className="zone-detail">
                      <span className="detail-label">Tiempo de entrega</span>
                      <span className="detail-value">{zone.time}</span>
                    </div>
                    <div className="zone-detail">
                      <span className="detail-label">Envío gratis</span>
                      <span className="detail-value highlight">{zone.cost}</span>
                    </div>
                    <div className="zone-detail">
                      <span className="detail-label">Costo regular</span>
                      <span className="detail-value">{zone.regularCost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="shipping-features">
          <div className="shipping-container">
            <div className="section-header">
              <span className="section-label">Ventajas</span>
              <h2>¿Por qué confiar en nuestro servicio?</h2>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="shipping-policies">
          <div className="shipping-container">
            <div className="section-header">
              <span className="section-label">Términos</span>
              <h2>Condiciones y Políticas</h2>
              <p>Lee detenidamente nuestras políticas de envío</p>
            </div>

            <div className="policies-grid">
              {policies.map((policy, index) => (
                <div key={index} className="policy-card">
                  <h3>{policy.title}</h3>
                  <ul>
                    {policy.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="shipping-additional">
          <div className="shipping-container">
            <div className="additional-grid">
              <div className="additional-card">
                <h3>Cambios y Devoluciones</h3>
                <p>
                  Si recibes un producto dañado o defectuoso, tienes 48 horas para reportarlo. 
                  Nos haremos cargo del retorno y envío del reemplazo sin costo adicional.
                </p>
                <a href="/contacto" className="info-link">Contactar Soporte →</a>
              </div>

              <div className="additional-card">
                <h3>Preguntas sobre tu Envío</h3>
                <p>
                  ¿Tienes dudas sobre el estado de tu pedido o necesitas información adicional? 
                  Nuestro equipo está disponible para ayudarte.
                </p>
                <a href="/contacto" className="info-link">Ir a Contacto →</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="shipping-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Listo para hacer tu pedido?</h2>
              <p>Explora nuestro catálogo y recibe tus componentes en la puerta de tu casa</p>
              <a href="/catalogo" className="cta-btn">
                Ver Catálogo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}