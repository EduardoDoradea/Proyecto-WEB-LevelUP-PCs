import { useState } from "react";
import Navbar from "../../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../../components/layout/Footer/Footer";
import api from "../../../utils/api.js";
import "../LoginPage/auth.css";

export default function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Enviamos solo el correo al backend
      await api.post("/api/clientes/solicitar-recuperacion", { correo: email });
      
      setStatus("success");
      setMessage("¡Solicitud recibida! Hemos enviado un código de verificación a tu número de teléfono registrado.");
    } catch (err) {
      setStatus("error");
      // Por seguridad, a veces es mejor no decir si el correo existe o no, 
      // pero para este ejemplo mostraremos el error.
      setMessage(err.response?.data?.message || "No pudimos procesar tu solicitud. Verifica el correo.");
    }
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="auth-container">
        <div className="auth-wrapper" style={{ minHeight: "500px" }}> {/* Altura ajustada */}
          
          <div className="auth-content">
            <div className="auth-header">
              <h1>Recuperar Cuenta</h1>
              <p>Ingresa tu correo para verificar tu identidad</p>
            </div>

            {status === "success" ? (
              <div style={{ textAlign: "center", color: "#fff" }}>
                <h3 style={{ color: "#00b4d8", marginBottom: "1rem" }}>¡Revisa tu teléfono!</h3>
                <p>{message}</p>
                <br/>
                <a href="/login" className="register-link">Volver al Login</a>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit}>
                {status === "error" && (
                   <div style={{ color: "#c62828", background: "#ffebee", padding: "10px", borderRadius: "4px" }}>
                     {message}
                   </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                    disabled={status === "loading"}
                  />
                </div>

                <button type="submit" className="auth-btn" disabled={status === "loading"}>
                  {status === "loading" ? "Verificando..." : "Enviar Código al Teléfono"}
                </button>
                
                <div className="auth-alternate">
                  <a href="/login" className="register-link">Cancelar y volver</a>
                </div>
              </form>
            )}
          </div>

          <div className="auth-visual">
            <div className="visual-overlay"></div>
            <div className="visual-content">
              <h2>Seguridad LevelUP</h2>
              <p>Protegemos tu cuenta validando tu identidad vía móvil</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}