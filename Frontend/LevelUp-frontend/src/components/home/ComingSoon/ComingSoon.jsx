import "./comingsoon.css";

export default function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">⚡</div>
          <h2>Ofertas Flash</h2>
          <p className="coming-soon-subtitle">Próximamente</p>
          <p className="coming-soon-description">
            Estamos preparando increíbles descuentos en los mejores componentes de hardware.
            <br />
            ¡No te lo pierdas!
          </p>
          <div className="coming-soon-badge">
            <span>🔥</span>
            <span>Grandes descuentos muy pronto</span>
          </div>
        </div>
      </div>
    </section>
  );
}