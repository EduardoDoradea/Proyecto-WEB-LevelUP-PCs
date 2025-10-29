import "../styles/summarycard.css";

export default function SummaryCard({ subtotal, shipping, tax, total, onCheckout }) {
  return (
    <div className="summary-card">
      <h2>Resumen</h2>
      <div className="summary-row">
        <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Envío</span> <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>IVA (13%)</span> <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span> <span>${total.toFixed(2)}</span>
      </div>

      {onCheckout && (
        <button className="checkout-btn" onClick={onCheckout}>
          Proceder al Checkout
        </button>
      )}
    </div>
  );
}
