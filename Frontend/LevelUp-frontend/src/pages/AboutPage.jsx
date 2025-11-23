import { useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../components/SidebarMenu";
import Footer from "../components/Footer";
import "../styles/about.css";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const timeline = [
    {
      year: "2025",
      title: "El Inicio",
      description: "Nace LevelUP PCs con la visión de democratizar el acceso a tecnología de alto rendimiento en El Salvador."
    },
    {
      year: "2028",
      title: "Expansión",
      description: "Abrimos nuestra primera tienda física y lanzamos el servicio de ensamblaje personalizado."
    },
    {
      year: "2031",
      title: "Innovación",
      description: "Implementamos el configurador online y alcanzamos más de 5,000 clientes satisfechos."
    },
    {
      year: "2035",
      title: "Líderes del Mercado",
      description: "Consolidamos nuestra posición como referente en hardware gaming y workstation en Centroamérica."
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excelencia",
      description: "Seleccionamos únicamente componentes de las marcas más prestigiosas del mercado."
    },
    {
      icon: "🤝",
      title: "Compromiso",
      description: "Acompañamos a nuestros clientes desde la asesoría hasta el soporte post-venta."
    },
    {
      icon: "⚡",
      title: "Innovación",
      description: "Nos mantenemos a la vanguardia con las últimas tecnologías del sector."
    },
    {
      icon: "💎",
      title: "Calidad",
      description: "Garantizamos productos originales con respaldo del fabricante."
    }
  ];

  const team = [
    {
      name: "Daniel Ayala",
      role: "Fundador & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Eduardo Doradea",
      role: "Directora de Operaciones",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Samuel Amaya",
      role: "Jefe de Soporte Técnico",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Rodrigo Hernández",
      role: "Especialista en Gaming",
      image: "https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg="
    }
  ];

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content">
            <h1>Nuestra Historia</h1>
            <p>Potenciando el rendimiento desde 2018</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="about-container">
            <div className="story-grid">
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop" 
                  alt="LevelUP Store"
                />
              </div>
              <div className="story-content">
                <span className="section-label">Quiénes Somos</span>
                <h2>Pasión por la tecnología</h2>
                <p>
                  En LevelUP PCs, no solo vendemos componentes de computadora. Somos entusiastas 
                  de la tecnología que entienden la importancia de cada pieza en tu sistema. 
                  Desde gamers profesionales hasta creadores de contenido, diseñamos soluciones 
                  personalizadas que llevan tu experiencia al siguiente nivel.
                </p>
                <p>
                  Nuestro compromiso es ofrecer hardware de vanguardia, asesoría experta y un 
                  servicio que supera las expectativas. Cada cliente es único, y cada PC que 
                  armamos refleja esa individualidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="about-timeline">
          <div className="about-container">
            <div className="timeline-header">
              <span className="section-label">Nuestro Recorrido</span>
              <h2>Años de experiencia</h2>
            </div>
            <div className="timeline-wrapper">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <div className="about-container">
            <div className="values-header">
              <span className="section-label">Nuestros Pilares</span>
              <h2>Lo que nos define</h2>
            </div>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="about-team">
          <div className="about-container">
            <div className="team-header">
              <span className="section-label">Conoce al Equipo</span>
              <h2>Expertos a tu servicio</h2>
            </div>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="about-container">
            <div className="cta-content">
              <h2>¿Listo para potenciar tu experiencia?</h2>
              <p>Descubre nuestra selección de componentes premium</p>
              <a href="/catalogo" className="cta-btn">Explorar Catálogo</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}