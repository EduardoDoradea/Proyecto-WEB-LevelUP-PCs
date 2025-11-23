import "../styles/ordersummary.css";
import CartItem from "./cart/CartItem/CartItem";

export default function OrderSummary({ cartItems, isEditing, setIsEditing, updateQuantity, removeItem }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="order-summary">
      <div className="summary-header">
        <h2>Resumen de compra</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
          <span>Editar</span>
        </button>
      </div>

      <div className="items-list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isEditing={isEditing}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="summary-totals">
        <div className="subtotal">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="pay-btn">Pagar ahora</button>
      <p className="secure-text">Todas las transacciones son seguras y están encriptadas</p>
    </div>
  );
}
