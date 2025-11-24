import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../../components/layout/Navbar/Navbar.jsx";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import BillingForm from "../../components/cart/BillingForm/BillingForm.jsx";
import PaymentForm from "../../components/cart/PaymentForm/PaymentForm.jsx";
import OrderSummary from "../../components/cart/OrderSummary/OrderSummary.jsx";
import "./checkoutpage.css";

export default function CheckoutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isEditingCart, setIsEditingCart] = useState(false);

  const formattedCartItems = cartItems.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image || "💻"
  }));

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

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
                <BillingForm />
                <PaymentForm />
              </div>
              <OrderSummary
                cartItems={formattedCartItems}
                isEditing={isEditingCart}
                setIsEditing={setIsEditingCart}
                updateQuantity={updateQuantity}
                removeItem={removeFromCart}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}