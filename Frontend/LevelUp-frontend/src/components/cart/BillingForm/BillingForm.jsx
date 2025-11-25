import "./billingForm.css";

export default function BillingForm({ address, setAddress }) {
  return (
    <div className="billing-form">
      <h2>Dirección de Entrega</h2>

      <div>
        <label>Dirección Completa *</label>
        <input 
          type="text"
          placeholder="Calle, colonia, municipio, departamento"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          minLength={10}
        />
        <small style={{ 
          color: '#888', 
          fontSize: '0.85rem', 
          marginTop: '0.5rem', 
          display: 'block' 
        }}>
          Ejemplo: Calle Principal #123, Colonia San Benito, San Salvador
        </small>
      </div>
    </div>
  );
}