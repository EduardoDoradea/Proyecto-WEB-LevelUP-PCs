import { useState } from 'react';
import "./billingForm.css";

export default function BillingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');

  const handleTextOnlyChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    setter(value);
  };

  const handleApartmentChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setApartment(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    
    if (value.length <= 8) {
      if (value.length > 4) {
        setPhone(value.slice(0, 4) + ' - ' + value.slice(4));
      } else {
        setPhone(value);
      }
    }
  };

  return (
    <div className="billing-form">
      <h2>Dirección de facturación</h2>

      <div className="form-grid">
        <div>
          <label>Nombre</label>
          <input 
            type="text"
            value={firstName}
            onChange={handleTextOnlyChange(setFirstName)}
          />
        </div>
        <div>
          <label>Apellidos</label>
          <input 
            type="text"
            value={lastName}
            onChange={handleTextOnlyChange(setLastName)}
          />
        </div>
      </div>

      <div>
        <label>Dirección</label>
        <input 
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-grid">
        <div>
          <label>Casa / Apt</label>
          <input 
            type="text"
            value={apartment}
            onChange={handleApartmentChange}
          />
        </div>
        <div>
          <label>Municipio</label>
          <input 
            type="text"
            value={municipality}
            onChange={handleTextOnlyChange(setMunicipality)}
          />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label>Departamento</label>
          <input 
            type="text"
            value={department}
            onChange={handleTextOnlyChange(setDepartment)}
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input 
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={11}
          />
        </div>
      </div>
    </div>
  );
}