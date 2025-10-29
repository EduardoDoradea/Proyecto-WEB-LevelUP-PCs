import "../styles/paymentForm.css";

export default function PaymentForm() {
  return (
    <div className="payment-form">
      <h2>Pago con tarjeta</h2>

      <div>
        <label>Número de tarjeta</label>
        <input type="text" placeholder="#### #### #### ####" maxLength={20}/>
      </div>

      <div className="form-grid">
        <div>
          <label>Fecha de vencimiento</label>
          <input type="text" placeholder="MM/AA" />
        </div>
        <div>
          <label>CCV</label>
          <input type="text" maxLength={3}/>
        </div>
      </div>

      <div>
        <label>Titular</label>
        <input type="text" />
      </div>
    </div>
  );
}
