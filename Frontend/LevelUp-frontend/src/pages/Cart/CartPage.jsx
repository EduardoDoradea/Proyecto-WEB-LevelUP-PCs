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
      // Validaciones del frontend
      if (!address.trim()) {
        setError("Por favor ingresa una dirección de entrega");
        setLoading(false);
        return;
      }

      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardHolder) {
        setError("Por favor completa todos los datos de la tarjeta");
        setLoading(false);
        return;
      }

      if (cartItems.length === 0) {
        setError("El carrito está vacío");
        setLoading(false);
        return;
      }

      // Preparar datos para el backend
      const pedidoData = {
        direccion: address,
        tarjeta: {
          numTarjeta: cardData.cardNumber.replace(/\s/g, ''), // Quitar espacios
          fechaVencimiento: cardData.expiryDate,
          ccv: cardData.cvv,
          titular: cardData.cardHolder
        },
        carrito: cartItems.map(item => ({
          idProducto: item.id,
          cantidad: item.quantity
        }))
      };

      console.log("Enviando pedido:", pedidoData);

      // Enviar al backend
      const response = await api.post("/api/pedidos/registroPedido", pedidoData);

      console.log("Respuesta del servidor:", response.data);

      if (response.data.success) {
        // Éxito
        setShowSuccess(true);
        clearCart(); // Limpiar el carrito
        
        // Esperar 3 segundos y redirigir
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(response.data.message || "Error al procesar el pedido");
      }

    } catch (err) {
      console.error("Error al procesar el pago:", err);
      
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.error || 
                       err.message || 
                       "Error al procesar el pago. Por favor intenta nuevamente.";
      
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
          zIndex: 9999
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
            padding: '3rem',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,180,216,0.4)'
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
                <BillingForm address={address} setAddress={setAddress} />
                <PaymentForm cardData={cardData} setCardData={setCardData} />
                
                {/* Mostrar errores */}
                {error && (
                  <div style={{
                    background: '#ff4444',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    textAlign: 'center'
                  }}>
                    {error}
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
    </>
  );
}