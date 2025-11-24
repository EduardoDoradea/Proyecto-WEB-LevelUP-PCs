import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import "./compatibility.css";

export default function CompatibilityPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const compatibilityGuides = [
    {
      id: 1,
      category: "Procesador y Placa Madre",
      icon: "🔧",
      color: "#00b4d8",
      points: [
        {
          title: "Socket del Procesador",
          description: "El socket del procesador debe coincidir exactamente con el de la placa madre.",
          examples: [
            "Intel: LGA 1700 (12va y 13va gen), LGA 1200 (10ma y 11va gen)",
            "AMD: AM5 (Ryzen 7000), AM4 (Ryzen 5000/3000/2000/1000)"
          ],
          important: "Este es el factor MÁS crítico. Un socket incompatible hace imposible el montaje."
        },
        {
          title: "Chipset Compatible",
          description: "El chipset determina las características y capacidades de la placa madre.",
          examples: [
            "Intel Z790/B760 para i9/i7/i5 13va gen",
            "AMD X670/B650 para Ryzen 7000 series"
          ],
          important: "Chipsets de gama alta ofrecen más PCIe lanes y opciones de overclocking."
        },
        {
          title: "BIOS Actualizada",
          description: "Procesadores nuevos pueden requerir actualización de BIOS.",
          examples: [
            "Ryzen 5000 en placas B450/X470 necesitan BIOS actualizada",
            "Verificar con el fabricante antes de comprar"
          ],
          important: "Sin BIOS compatible, la PC no arrancará."
        }
      ]
    },
    {
      id: 2,
      category: "Memoria RAM",
      icon: "💾",
      color: "#9333ea",
      points: [
        {
          title: "Tipo de RAM (DDR)",
          description: "La generación de RAM debe ser compatible con la placa madre.",
          examples: [
            "DDR5: Placas modernas (Intel 12va gen+, AMD Ryzen 7000+)",
            "DDR4: Mayoría de sistemas actuales",
            "DDR3: Sistemas antiguos (no compatible con placas nuevas)"
          ],
          important: "Las ranuras DDR4 y DDR5 son físicamente diferentes, no son intercambiables."
        },
        {
          title: "Velocidad (MHz)",
          description: "La RAM debe funcionar a velocidades soportadas por CPU y motherboard.",
          examples: [
            "Intel 13va gen soporta hasta DDR5-5600",
            "AMD Ryzen 7000 soporta hasta DDR5-5200",
            "La RAM más rápida funcionará a la velocidad más baja soportada"
          ],
          important: "RAM más rápida que lo soportado funcionará pero a velocidad reducida."
        },
        {
          title: "Capacidad Máxima",
          description: "Verificar capacidad máxima soportada por la placa madre.",
          examples: [
            "Placas modernas: 128GB - 192GB",
            "Placas económicas: 64GB - 128GB",
            "Verificar número de ranuras (2 o 4)"
          ],
          important: "Dual-channel (2 módulos) ofrece mejor rendimiento que single-channel."
        }
      ]
    },
    {
      id: 3,
      category: "Tarjeta Gráfica",
      icon: "🎮",
      color: "#ec4899",
      points: [
        {
          title: "Slot PCIe",
          description: "Todas las GPU modernas usan PCIe x16, compatible con versiones anteriores.",
          examples: [
            "PCIe 4.0 GPU funcionará en slot PCIe 3.0",
            "PCIe 5.0 es retrocompatible con 4.0 y 3.0",
            "RTX 4090 usa PCIe 4.0 x16"
          ],
          important: "Asegurar que el slot esté libre y no obstruya otras ranuras necesarias."
        },
        {
          title: "Espacio en el Gabinete",
          description: "GPUs de alto rendimiento son grandes y requieren espacio suficiente.",
          examples: [
            "RTX 4090: Hasta 336mm de largo, 3-4 slots de ancho",
            "RTX 4070: ~240-300mm de largo, 2-2.5 slots",
            "Medir el gabinete antes de comprar"
          ],
          important: "GPU demasiado grande no cabrá o bloqueará ventiladores/puertos."
        },
        {
          title: "Alimentación (PSU)",
          description: "La GPU necesita suficientes conectores de poder y wattaje adecuado.",
          examples: [
            "RTX 4090: 450W, conector 12VHPWR o 3x 8-pin",
            "RTX 4070: 200W, 1x 8-pin",
            "RX 7900 XTX: 355W, 2x 8-pin"
          ],
          important: "PSU insuficiente causará inestabilidad o apagones."
        }
      ]
    },
    {
      id: 4,
      category: "Fuente de Poder (PSU)",
      icon: "⚡",
      color: "#f59e0b",
      points: [
        {
          title: "Wattaje Total",
          description: "Calcular consumo total del sistema y agregar 20-30% de margen.",
          examples: [
            "Sistema básico (iGPU): 300-450W",
            "Gaming medio (RTX 4060/4070): 550-650W",
            "Gaming alto (RTX 4080/4090): 850-1000W+"
          ],
          important: "Usar calculadora de PSU online para estimación precisa."
        },
        {
          title: "Certificación 80 Plus",
          description: "La eficiencia energética afecta estabilidad y consumo eléctrico.",
          examples: [
            "80 Plus Bronze: 85% eficiencia mínima",
            "80 Plus Gold: 90% eficiencia (recomendado)",
            "80 Plus Platinum/Titanium: 92-94% eficiencia"
          ],
          important: "Mayor eficiencia = menos calor y menor consumo eléctrico."
        },
        {
          title: "Conectores Necesarios",
          description: "Verificar que la PSU tenga todos los conectores requeridos.",
          examples: [
            "24-pin ATX (motherboard)",
            "8-pin/4+4-pin EPS (CPU)",
            "8-pin/6-pin PCIe (GPU)",
            "SATA/Molex para almacenamiento y periféricos"
          ],
          important: "GPUs modernas pueden requerir conectores especiales (12VHPWR)."
        }
      ]
    },
    {
      id: 5,
      category: "Almacenamiento",
      icon: "💿",
      color: "#10b981",
      points: [
        {
          title: "Tipo de Interfaz",
          description: "M.2 NVMe, M.2 SATA, y SATA 2.5/3.5 tienen diferentes velocidades.",
          examples: [
            "M.2 NVMe (PCIe): Hasta 7000 MB/s (Gen 5)",
            "M.2 SATA: Hasta 600 MB/s",
            "SATA 2.5/3.5: Hasta 600 MB/s"
          ],
          important: "No todos los slots M.2 soportan NVMe, algunos solo SATA."
        },
        {
          title: "Slots y Puertos Disponibles",
          description: "Verificar cantidad de slots M.2 y puertos SATA en la placa madre.",
          examples: [
            "Placas modernas: 2-4 slots M.2",
            "Puertos SATA: 4-6 en placas estándar",
            "Algunos slots M.2 deshabilitan puertos SATA"
          ],
          important: "Leer manual de placa madre para conocer limitaciones."
        },
        {
          title: "Generación PCIe",
          description: "M.2 NVMe usa lanes PCIe, la generación afecta velocidad máxima.",
          examples: [
            "PCIe Gen 5: Hasta 14,000 MB/s",
            "PCIe Gen 4: Hasta 7,000 MB/s",
            "PCIe Gen 3: Hasta 3,500 MB/s"
          ],
          important: "SSD más rápido que el slot funcionará a velocidad reducida."
        }
      ]
    },
    {
      id: 6,
      category: "Refrigeración",
      icon: "❄️",
      color: "#06b6d4",
      points: [
        {
          title: "Altura del Cooler (CPU)",
          description: "El cooler debe caber dentro del gabinete con espacio suficiente.",
          examples: [
            "Gabinetes compactos: Máx 160mm altura",
            "Gabinetes mid-tower: Máx 165-180mm",
            "Gabinetes full-tower: Sin restricción usual"
          ],
          important: "Coolers tower grandes pueden bloquear ranuras RAM o interferir con panel lateral."
        },
        {
          title: "Socket Compatible",
          description: "El cooler debe ser compatible con el socket del procesador.",
          examples: [
            "Intel LGA 1700 usa patrón de montaje diferente a LGA 1200",
            "AMD AM5 usa mismo montaje que AM4",
            "Verificar kit de montaje incluido"
          ],
          important: "Coolers nuevos incluyen brackets para múltiples sockets."
        },
        {
          title: "TDP del Procesador",
          description: "El cooler debe poder disipar el calor generado por la CPU.",
          examples: [
            "CPUs <65W: Cooler stock o básico",
            "CPUs 95-125W: Cooler tower o AIO 240mm",
            "CPUs >150W: AIO 280-360mm o tower premium"
          ],
          important: "CPU con overclocking genera más calor y necesita mejor refrigeración."
        }
      ]
    }
  ];

  const tips = [
    {
      icon: "📏",
      title: "Mide tu Gabinete",
      description: "Antes de comprar, verifica dimensiones internas y clearance de componentes."
    },
    {
      icon: "📖",
      title: "Lee los Manuales",
      description: "Los manuales de placa madre y gabinete contienen información crucial de compatibilidad."
    },
    {
      icon: "🔍",
      title: "Investiga Antes",
      description: "Busca builds similares y reviews para identificar problemas comunes."
    },
    {
      icon: "💡",
      title: "Consulta con Expertos",
      description: "Nuestro equipo puede verificar compatibilidad antes de tu compra."
    }
  ];

  const selectedGuide = compatibilityGuides[selectedCategory];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="compatibility-page">
        {/* Hero Section */}
        <section className="compatibility-hero">
          <div className="compatibility-hero-overlay"></div>
          <div className="compatibility-hero-content">
            <h1>Guía de Compatibilidad</h1>
            <p>Todo lo que necesitas saber antes de armar tu PC</p>
          </div>
        </section>

        {/* Intro */}
        <section className="compatibility-intro">
          <div className="compatibility-container">
            <div className="intro-content">
              <span className="section-label">Lo Básico</span>
              <h2>¿Por qué es Importante la Compatibilidad?</h2>
              <p>
                Ensamblar una PC requiere más que simplemente elegir los mejores componentes. 
                La compatibilidad entre piezas es crucial para garantizar que tu sistema funcione 
                correctamente, de manera estable y aproveche al máximo cada componente.
              </p>
              <p>
                Esta guía te ayudará a entender los puntos clave de compatibilidad entre cada 
                tipo de componente, evitando compras incorrectas y problemas de ensamblaje.
              </p>
            </div>
          </div>
        </section>

        {/* Category Selector */}
        <section className="compatibility-selector">
          <div className="compatibility-container">
            <div className="selector-grid">
              {compatibilityGuides.map((guide, index) => (
                <button
                  key={guide.id}
                  className={`selector-card ${selectedCategory === index ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(index)}
                  style={{ '--card-color': guide.color }}
                >
                  <div className="selector-icon">{guide.icon}</div>
                  <h3>{guide.category}</h3>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Guide Content */}
        <section className="compatibility-content">
          <div className="compatibility-container">
            <div className="content-header">
              <div 
                className="content-icon" 
                style={{ background: `${selectedGuide.color}15`, color: selectedGuide.color }}
              >
                {selectedGuide.icon}
              </div>
              <h2>{selectedGuide.category}</h2>
            </div>

            <div className="points-grid">
              {selectedGuide.points.map((point, index) => (
                <div key={index} className="point-card">
                  <div className="point-header">
                    <h3>{point.title}</h3>
                  </div>
                  
                  <p className="point-description">{point.description}</p>

                  <div className="point-examples">
                    <h4>Ejemplos:</h4>
                    <ul>
                      {point.examples.map((example, exIndex) => (
                        <li key={exIndex}>{example}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="point-important">
                    <span className="important-icon">⚠️</span>
                    <p><strong>Importante:</strong> {point.important}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="compatibility-tips">
          <div className="compatibility-container">
            <div className="section-header">
              <span className="section-label">Consejos</span>
              <h2>Recomendaciones Generales</h2>
            </div>

            <div className="tips-grid">
              {tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <div className="tip-icon">{tip.icon}</div>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="compatibility-cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2>¿Necesitas Ayuda con tu Build?</h2>
              <p>Nuestro equipo de expertos puede asesorarte y verificar la compatibilidad de tus componentes</p>
              <div className="cta-buttons">
                <a href="/contacto" className="cta-btn primary">
                  Contactar Expertos
                </a>
                <a href="/catalogo" className="cta-btn secondary">
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