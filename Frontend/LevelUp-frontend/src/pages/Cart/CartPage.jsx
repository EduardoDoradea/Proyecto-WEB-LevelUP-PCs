import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import BillingForm from "../../components/cart/BillingForm/BillingForm.jsx";
import PaymentForm from "../../components/cart/PaymentForm/PaymentForm.jsx";
import OrderSummary from "../../components/cart/OrderSummary/OrderSummary.jsx";
import "./checkoutpage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isEditingCart, setIsEditingCart] = useState(false);
  
  // Estados para el formulario
  const [address, setAddress] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });
  
  // Estados para UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDenied, setShowDenied] = useState(false);
  const [totalPagado, setTotalPagado] = useState(0); // 👈 NUEVO: Guardar el total

  const formattedCartItems = cartItems.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image 
  }));

  const handlePay = async () => {
    setError(null);
    setLoading(true);

    // Simular un pequeño delay para el procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Validaciones del frontend
      if (!address.trim()) {
        setError("Por favor ingresa una dirección de entrega");
        setLoading(false);
        return;
      }

      if (address.trim().length < 10) {
        setError("La dirección debe tener al menos 10 caracteres");
        setLoading(false);
        return;
      }

      if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
        setError("Por favor ingresa un número de tarjeta válido (16 dígitos)");
        setLoading(false);
        return;
      }

      if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
        setError("Por favor ingresa una fecha de vencimiento válida (MM/AA)");
        setLoading(false);
        return;
      }

      if (!cardData.cvv || cardData.cvv.length < 3) {
        setError("Por favor ingresa un CCV válido (3 dígitos)");
        setLoading(false);
        return;
      }

      if (!cardData.cardHolder || cardData.cardHolder.trim().length < 3) {
        setError("Por favor ingresa el nombre del titular de la tarjeta");
        setLoading(false);
        return;
      }

      if (cartItems.length === 0) {
        setError("El carrito está vacío");
        setLoading(false);
        return;
      }

      // CAPTURAR EL TOTAL ANTES DE LIMPIAR EL CARRITO
      const totalActual = getTotalPrice();
      setTotalPagado(totalActual);

      // RANDOMIZADOR: 70% éxito, 30% denegado
      const randomNumber = Math.random();
      const pagoExitoso = randomNumber > 0.3; // 70% de probabilidad de éxito

      console.log("🎲 Número aleatorio:", randomNumber);
      console.log("✅ Resultado:", pagoExitoso ? "APROBADO" : "DENEGADO");
      console.log("💰 Total a pagar: $", totalActual.toFixed(2));

      setLoading(false);

      if (pagoExitoso) {
        // PAGO EXITOSO
        setShowSuccess(true);
        clearCart();
        
        setTimeout(() => {
          navigate("/");
        }, 3500);
      } else {
        // PAGO DENEGADO
        setShowDenied(true);
        
        setTimeout(() => {
          setShowDenied(false);
        }, 4000);
      }

    } catch (err) {
      console.error("Error al procesar el pago:", err);
      setError("Error inesperado. Por favor intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Modal de ÉXITO */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
            padding: '3rem',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,180,216,0.4)',
            animation: 'slideInUp 0.5s ease-out'
          }}>
            <div style={{ 
              fontSize: '5rem', 
              marginBottom: '1rem',
              animation: 'scaleIn 0.5s ease-out'
            }}>✓</div>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem', 
              color: 'white',
              fontWeight: '300',
              letterSpacing: '1px'
            }}>
              ¡Pago Exitoso!
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Tu pedido ha sido procesado correctamente.
              <br />
              {/* 👇 AQUÍ SE MUESTRA EL TOTAL GUARDADO */}
              <strong style={{ fontSize: '1.3rem' }}>Total pagado: ${totalPagado.toFixed(2)}</strong>
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.95)'
            }}>
              Redirigiendo al inicio...
            </div>
          </div>
        </div>
      )}

      {/* Modal de DENEGADO */}
      {showDenied && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            padding: '3rem',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(220,38,38,0.4)',
            animation: 'slideInUp 0.5s ease-out'
          }}>
            <div style={{ 
              fontSize: '5rem', 
              marginBottom: '1rem',
              animation: 'shake 0.5s ease-out'
            }}>✗</div>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem', 
              color: 'white',
              fontWeight: '300',
              letterSpacing: '1px'
            }}>
              Pago Denegado
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Lo sentimos, tu pago no pudo ser procesado.
              <br />
              Por favor, verifica los datos de tu tarjeta e intenta nuevamente.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.95)'
            }}>
              Posibles causas: Fondos insuficientes, tarjeta vencida o datos incorrectos
            </div>
          </div>
        </div>
      )}

      <main className="checkout-main">
        <div className="checkout-container">
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '2rem' }}>🛒</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tu carrito está vacío</h2>
              <p style={{ color: '#888', marginBottom: '2rem' }}>Agrega productos para comenzar tu compra</p>
              <a 
                href="/componentes" 
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}
              >
                Explorar Productos
              </a>
            </div>
          ) : (
            <div className="checkout-grid">
              <div className="forms-column">
                <BillingForm address={address} setAddress={setAddress} />
                <PaymentForm cardData={cardData} setCardData={setCardData} />
                
                {/* Mostrar errores */}
                {error && (
                  <div style={{
                    background: '#dc2626',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    textAlign: 'center',
                    border: '2px solid #991b1b',
                    animation: 'shake 0.5s ease-out'
                  }}>
                    <strong>⚠️ {error}</strong>
                  </div>
                )}
              </div>
              
              <OrderSummary
                cartItems={formattedCartItems}
                isEditing={isEditingCart}
                setIsEditing={setIsEditingCart}
                updateQuantity={updateQuantity}
                removeItem={removeFromCart}
                onPay={handlePay}
                loading={loading}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </>
  );
}