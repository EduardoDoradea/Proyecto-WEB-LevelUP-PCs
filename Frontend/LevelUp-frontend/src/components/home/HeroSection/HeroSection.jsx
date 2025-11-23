import "./hero.css";

const bannerURL = "https://i.ibb.co/8nR8tKCb/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${bannerURL})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Rendimiento sin límites</h1>
        <p>Descubre lo mejor en hardware para llevar tu PC al siguiente nivel</p>
        <a href="/categorias" className="hero-btn">Explorar productos</a>
      </div>
    </section>
  );
}
