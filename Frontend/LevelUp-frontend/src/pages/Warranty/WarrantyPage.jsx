import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./warranty.css";

export default function WarrantyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const warrantyTypes = [
    {
      id: 1,
      icon: "🏭",
      title: "Garantía del Fabricante",
      duration: "1-3 años",
      color: "#00b4d8",
      coverage: [
        "Defectos de fabricación",
        "Fallas de componentes originales",
        "Mal funcionamiento sin intervención",
        "Cobertura directa con el fabricante"
      ],
      process: [
        "Presentar factura de compra original",
        "Verificación del producto y serial",
        "Evaluación técnica del fabricante",
        "Reparación o reemplazo según corresponda"
      ]
    },
    {
      id: 2,
      icon: "🏪",
      title: "Garantía LevelUP",
      duration: "30 días",
      color: "#9333ea",
      coverage: [
        "DOA (Dead On Arrival)",
        "Defectos evidentes al recibir",
        "Incompatibilidad verificada",
        "Cambio directo en tienda"
      ],
      process: [
        "Contactar dentro de los 30 días",
        "Producto en condiciones originales",
        "Empaque y accesorios completos",
        "Cambio inmediato por producto idéntico"
      ]
    }
  ];

  const exclusions = [
    {
      title: "No cubre",
      items: [
        "Daños físicos o golpes",
        "Exposición a líquidos",
        "Modificaciones no autorizadas",
        "Sobre-voltaje o descargas eléctricas",
        "Mal uso o negligencia",
        "Sellos de garantía rotos",
        "Desgaste normal por uso",
        "Daños estéticos superficiales"
      ]
    }
  ];

  const requirements = [
    {
      icon: "📄",
      title: "Factura Original",
      description: "Indispensable para validar fecha de compra y cobertura"
    },
    {
      icon: "🔢",
      title: "Número de Serie",
      description: "Debe ser legible y coincidir con el producto"
    },
    {
      icon: "📦",
      title: "Empaque Original",
      description: "Preferiblemente con caja y accesorios completos"
    },
    {
      icon: "🔒",
      title: "Sellos Intactos",
      description: "No debe tener sellos de garantía rotos o manipulados"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Contacto Inicial",
      description: "Comunícate con nosotros vía email, teléfono o visita directa a tienda. Describe el problema del producto."
    },
    {
      number: "02",
      title: "Evaluación",
      description: "Nuestro equipo técnico evaluará el producto para determinar si aplica garantía del fabricante o LevelUP."
    },
    {
      number: "03",
      title: "Procesamiento",
      description: "Una vez aprobada, procedemos con la reparación, reemplazo o gestión con el fabricante según corresponda."
    },
    {
      number: "04",
      title: "Resolución",
      description: "Recibirás tu producto reparado o reemplazado. En caso de reemplazo, será por modelo idéntico o superior."
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="warranty-page">
        {/* Hero Section */}
        <section className="warranty-hero">
          <div className="warranty-hero-overlay"></div>
          <div className="warranty-hero-content">
            <h1>Garantías</h1>
            <p>Protegiendo tu inversión tecnológica</p>
          </div>
        </section>

        {/* Intro */}
        <section className="warranty-intro">
          <div className="warranty-container">
            <div className="intro-content">
              <span className="section-label">Nuestro Compromiso</span>
              <h2>Respaldo Total en Cada Compra</h2>
              <p>
                En LevelUP PCs, cada producto que vendemos cuenta con garantía tanto del fabricante 
                como nuestra propia garantía de tienda. Nos aseguramos de que tu inversión esté protegida 
                y de brindarte soporte completo ante cualquier eventualidad.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Types */}
        <section className="warranty-types">
          <div className="warranty-container">
            <div className="section-header">
              <span className="section-label">Tipos de Garantía</span>
              <h2>Doble Protección para tu Tranquilidad</h2>
            </div>

            <div className="types-grid">
              {warrantyTypes.map((type) => (
                <div key={type.id} className="type-card" style={{ '--card-color': type.color }}>
                  <div className="type-header">
                    <div className="type-icon">{type.icon}</div>
                    <div className="type-title-group">
                      <h3>{type.title}</h3>
                      <span className="type-duration">{type.duration}</span>
                    </div>
                  </div>

                  <div className="type-section">
                    <h4>Cobertura</h4>
                    <ul className="type-list">
                      {type.coverage.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="type-section">
                    <h4>Proceso</h4>
                    <ol className="type-list ordered">
                      {type.process.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="warranty-requirements">
          <div className="warranty-container">
            <div className="section-header">
              <span className="section-label">Requisitos</span>
              <h2>¿Qué Necesitas para Hacer Válida la Garantía?</h2>
            </div>

            <div className="requirements-grid">
              {requirements.map((req, index) => (
                <div key={index} className="requirement-card">
                  <div className="requirement-icon">{req.icon}</div>
                  <h3>{req.title}</h3>
                  <p>{req.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusions */}
        <section className="warranty-exclusions">
          <div className="warranty-container">
            <div className="exclusions-content">
              <div className="exclusions-header">
                <span className="warning-icon">⚠️</span>
                <h2>Exclusiones de Garantía</h2>
                <p>Es importante conocer qué situaciones NO están cubiertas</p>
              </div>

              <div className="exclusions-grid">
                {exclusions.map((section, index) => (
                  <div key={index} className="exclusion-section">
                    <h3>{section.title}</h3>
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="warranty-notes">
          <div className="warranty-container">
            <div className="notes-card">
              <h3>Notas Importantes</h3>
              <ul>
                <li>
                  <strong>Tiempo de Respuesta:</strong> Las garantías del fabricante pueden tardar 
                  de 15 a 45 días hábiles dependiendo del tipo de producto y disponibilidad.
                </li>
                <li>
                  <strong>Productos de Reemplazo:</strong> En caso de no haber stock del modelo 
                  exacto, se ofrecerá un modelo de especificaciones iguales o superiores.
                </li>
                <li>
                  <strong>Costos de Envío:</strong> Los gastos de envío para gestión de garantía 
                  del fabricante son responsabilidad del cliente.
                </li>
                <li>
                  <strong>Respaldo de Información:</strong> LevelUP no se hace responsable por 
                  pérdida de datos. Se recomienda respaldar información antes de entregar productos.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="warranty-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Necesitas Hacer Efectiva tu Garantía?</h2>
              <p>Contáctanos y nuestro equipo te guiará en todo el proceso</p>
              <div className="cta-buttons">
                <a href="/nosotros/contacto" className="cta-btn primary">
                  Contactar Soporte
                </a>
                <a href="/nosotros/ubicación" className="cta-btn secondary">
                  Visitar Tienda
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