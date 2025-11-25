import { useState } from 'react';
import "./billingForm.css";

export default function BillingForm() {
  const [address, setAddress] = useState('');

  return (
    <div className="billing-form">
      <h2>Dirección de Entrega</h2>

      <div>
        <label>Dirección</label>
        <input 
          type="text"
          placeholder="Calle, colonia, municipio, departamento"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  );
}