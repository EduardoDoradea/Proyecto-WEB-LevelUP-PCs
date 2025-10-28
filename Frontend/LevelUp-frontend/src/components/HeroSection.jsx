import "../styles/hero.css";
import banner from "../assets/banners/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${banner})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Rendimiento sin límites</h1>
        <p>Descubre lo mejor en hardware para llevar tu PC al siguiente nivel</p>
        <a href="/productos" className="hero-btn">Explorar productos</a>
      </div>
    </section>
  );
}
