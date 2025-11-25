import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import BillingForm from "../../components/cart/BillingForm/BillingForm.jsx";
import PaymentForm from "../../components/cart/PaymentForm/PaymentForm.jsx";
import OrderSummary from "../../components/cart/OrderSummary/OrderSummary.jsx";
import api from "../../utils/api.js";
import "./checkoutpage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
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

    try {
      // ===== VALIDACIONES DEL FRONTEND =====
      
      // 1. Validar dirección
      if (!address || !address.trim()) {
        setError("Por favor ingresa una dirección de entrega");
        setLoading(false);
        return;
      }

      // 2. Validar datos de tarjeta completos
      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardHolder) {
        setError("Por favor completa todos los datos de la tarjeta");
        setLoading(false);
        return;
      }

      // 3. Validar longitud de tarjeta (debe ser 16 dígitos sin espacios)
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length !== 16) {
        setError("El número de tarjeta debe tener 16 dígitos");
        setLoading(false);
        return;
      }

      // 4. Validar CVV (debe ser 3 dígitos)
      if (cardData.cvv.length !== 3) {
        setError("El CVV debe tener 3 dígitos");
        setLoading(false);
        return;
      }

      // 5. Validar formato de fecha (MM/AA)
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
        setError("Formato de fecha inválido (debe ser MM/AA)");
        setLoading(false);
        return;
      }

      // 6. Validar carrito no vacío
      if (cartItems.length === 0) {
        setError("El carrito está vacío");
        setLoading(false);
        return;
      }

      // ===== PREPARAR DATOS PARA EL BACKEND =====
      const pedidoData = {
        direccion: address.trim(), // Campo que espera el backend
        tarjeta: {
          numTarjeta: cleanCardNumber, // Sin espacios
          fechaVencimiento: cardData.expiryDate,
          ccv: cardData.cvv,
          titular: cardData.cardHolder.trim()
        },
        carrito: cartItems.map(item => ({
          idProducto: item.id,
          cantidad: item.quantity
        }))
      };

      console.log(" Enviando pedido al backend:", pedidoData);

      // ===== ENVIAR AL BACKEND =====
      const response = await api.post("/api/pedidos/registroPedido", pedidoData);

      console.log(" Respuesta del servidor:", response.data);

      // ===== VERIFICAR RESPUESTA =====
      if (response.data.success) {
        console.log(" Pedido procesado exitosamente");
        
        // Mostrar mensaje de éxito
        setShowSuccess(true);
        
        // Limpiar el carrito
        clearCart();
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(response.data.message || "Error al procesar el pedido");
      }

    } catch (err) {
      console.error(" Error al procesar el pago:", err);
      
      // ===== MANEJO DE ERRORES MEJORADO =====
      let errorMsg = "Error al procesar el pago. Por favor intenta nuevamente.";
      
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.status === 400) {
        errorMsg = "Datos inválidos. Verifica todos los campos.";
      } else if (err.response?.status === 401) {
        errorMsg = "Tu sesión ha expirado. Por favor inicia sesión nuevamente.";
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.status === 500) {
        errorMsg = "Error del servidor. Por favor contacta soporte.";
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Modal de éxito */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
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
            animation: 'slideIn 0.5s ease-out'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
              ¡Pago Exitoso!
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
              Tu pedido ha sido procesado correctamente.
              <br />
              Redirigiendo...
            </p>
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
                {/* Componente BillingForm - Pasar address y setAddress */}
                <BillingForm address={address} setAddress={setAddress} />
                
                {/* Componente PaymentForm */}
                <PaymentForm cardData={cardData} setCardData={setCardData} />
                
                {/* Mostrar errores */}
                {error && (
                  <div style={{
                    background: '#ff4444',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    ⚠️ {error}
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}