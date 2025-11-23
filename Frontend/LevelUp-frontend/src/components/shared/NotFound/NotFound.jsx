import { useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="title-section">
          <h1 className="error-code">404</h1>
          <div className="gradient-line"></div>
        </div>

        <div className="message-section">
          <h2 className="error-title">Página no encontrada</h2>
          <p className="error-description">
            Lo sentimos, la página que buscas no existe.
          </p>
          <p className="error-hint">
            Es posible que el enlace esté roto o que la página haya sido eliminada.
          </p>
        </div>

        <div className="button-group">
          <button onClick={() => navigate("/")} className="btn-primary">
            Volver al inicio
          </button>
          
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Página anterior
          </button>
        </div>

        <div className="footer-section">
          <p className="footer-text">
            ¿Necesitas ayuda? Visita nuestro{" "}
            <button onClick={() => navigate("/categorias")} className="footer-link">
              catálogo de productos
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}