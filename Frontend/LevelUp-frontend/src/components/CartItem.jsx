import React from "react";
import "../styles/CartItem.css";

export default function CartItem({ name, price, quantity, image }) {
  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item-image" />
      <div className="cart-item-info">
        <h4>{name}</h4>
        <p>Cantidad: {quantity}</p>
        <p className="cart-item-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
