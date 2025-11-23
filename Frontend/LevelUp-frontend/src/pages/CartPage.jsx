import { useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import SidebarMenu from "../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../components/layout/Footer/Footer";
import BillingForm from "../components/cart/BillingForm/BillingForm.jsx";
import PaymentForm from "../components/cart/PaymentForm/PaymentForm.jsx";
import OrderSummary from "../components/cart/OrderSummary/OrderSummary.jsx";
import "../styles/checkoutpage.css";

export default function CheckoutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Laptop ASUS", quantity: 1, price: 999.99, image: "💻" },
    { id: 2, name: "Mouse Gamer", quantity: 2, price: 49.99, image: "🖱️" },
  ]);
  const [isEditingCart, setIsEditingCart] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} cartCount={cartItems} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="checkout-main">
        <div className="checkout-container">
          <div className="checkout-grid">
            <div className="forms-column">
              <BillingForm />
              <PaymentForm />
            </div>
            <OrderSummary
              cartItems={cartItems}
              isEditing={isEditingCart}
              setIsEditing={setIsEditingCart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}