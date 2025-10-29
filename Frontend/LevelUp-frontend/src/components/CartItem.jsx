import "../styles/cartitem.css";

export default function CartItem({ item, isEditing, updateQuantity, removeItem }) {
  return (
    <div className="cart-item">
      <div className="item-image">{item.image}</div>

      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-quantity">
          {isEditing ? (
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>Cantidad: {item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          ) : (
            <p>Cantidad: {item.quantity}</p>
          )}
        </div>
        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {isEditing && (
        <button className="remove-btn" onClick={() => removeItem(item.id)}>Quitar</button>
      )}
    </div>
  );
}
