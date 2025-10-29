import React, { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import CheckoutForm from "../components/CheckoutForm";
import "../styles/CartPage.css";

export default function CartPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <main className="cart-layout">
      <section className="cart-section">
        <ShoppingCart onCheckoutClick={() => setCheckoutOpen(true)} />
      </section>

      {checkoutOpen && (
        <div className="checkout-popup-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="checkout-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setCheckoutOpen(false)}>
              ✕
            </button>
            <CheckoutForm />
          </div>
        </div>
      )}
    </main>
  );
}
