import "./paymentForm.css";

export default function PaymentForm({ cardData, setCardData }) {
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, ''); 
    const onlyNumbers = value.replace(/\D/g, ''); 
    
    if (onlyNumbers.length <= 16) {
      const formatted = onlyNumbers.match(/.{1,4}/g)?.join(' ') || onlyNumbers;
      setCardData({ ...cardData, cardNumber: formatted });
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    
    if (value.length <= 4) {
      if (value.length >= 3) {
        setCardData({ ...cardData, expiryDate: value.slice(0, 2) + '/' + value.slice(2) });
      } else {
        setCardData({ ...cardData, expiryDate: value });
      }
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 3) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  const handleCardHolderChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
    setCardData({ ...cardData, cardHolder: value });
  };

  return (
    <div className="payment-form">
      <h2>Pago con tarjeta</h2>

      <div>
        <label>Número de tarjeta</label>
        <input 
          type="text" 
          placeholder="#### #### #### ####" 
          value={cardData.cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
          required
        />
      </div>

      <div className="form-grid">
        <div>
          <label>Fecha de vencimiento</label>
          <input 
            type="text" 
            placeholder="MM/AA"
            value={cardData.expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
            required
          />
        </div>
        <div>
          <label>CCV</label>
          <input 
            type="text"
            placeholder="###"
            value={cardData.cvv}
            onChange={handleCvvChange}
            maxLength={3}
            required
          />
        </div>
      </div>

      <div>
        <label>Titular</label>
        <input 
          type="text"
          placeholder="Juan Pérez"
          value={cardData.cardHolder}
          onChange={handleCardHolderChange}
          required
        />
      </div>
    </div>
  );
}