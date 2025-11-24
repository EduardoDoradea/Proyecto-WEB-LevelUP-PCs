import { useState } from "react";
import "./paymentForm.css";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, ''); 
    const onlyNumbers = value.replace(/\D/g, ''); 
    
    if (onlyNumbers.length <= 16) {
      const formatted = onlyNumbers.match(/.{1,4}/g)?.join(' ') || onlyNumbers;
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    
    if (value.length <= 4) {
      if (value.length >= 3) {
        setExpiryDate(value.slice(0, 2) + '/' + value.slice(2));
      } else {
        setExpiryDate(value);
      }
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleCardHolderChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
    setCardHolder(value);
  };

  return (
    <div className="payment-form">
      <h2>Pago con tarjeta</h2>

      <div>
        <label>Número de tarjeta</label>
        <input 
          type="text" 
          placeholder="#### #### #### ####" 
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
        />
      </div>

      <div className="form-grid">
        <div>
          <label>Fecha de vencimiento</label>
          <input 
            type="text" 
            placeholder="MM/AA"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
          />
        </div>
        <div>
          <label>CCV</label>
          <input 
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
          />
        </div>
      </div>

      <div>
        <label>Titular</label>
        <input 
          type="text"
          value={cardHolder}
          onChange={handleCardHolderChange}
        />
      </div>
    </div>
  );
}