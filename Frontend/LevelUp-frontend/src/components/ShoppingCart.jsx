import React from "react";
import "../styles/ShoppingCart.css";

export default function ShoppingCart() {
  const cartItems = [
    {
      id: 1,
      name: "Laptop ASUS",
      price: 999.99,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/09/32/blur-1869395_960_720.jpg",
    },
    {
      id: 2,
      name: "Mouse Gamer",
      price: 49.99,
      quantity: 2,
      image:
        "https://cdn.pixabay.com/photo/2015/01/21/14/14/computer-606016_1280.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-summary">
      <h2>Resumen de compra</h2>
      <div className="summary-items">
        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Cantidad: {item.quantity}</p>
              <span>${item.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-total">
        <div className="total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="total-row grand">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button className="pay-btn">Pagar ahora</button>
      </div>
    </div>
  );
}
