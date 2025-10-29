import React from "react";
import "../styles/billingForm.css";

export default function BillingForm() {
  return (
    <div className="billing-form">
      <h2>Dirección de facturación</h2>

      <div className="form-grid">
        <div>
          <label>Nombre</label>
          <input type="text" />
        </div>
        <div>
          <label>Apellidos</label>
          <input type="text" />
        </div>
      </div>

      <div>
        <label>Dirección</label>
        <input type="text" />
      </div>

      <div className="form-grid">
        <div>
          <label>Casa / Apt</label>
          <input type="text" />
        </div>
        <div>
          <label>Municipio</label>
          <input type="text" />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label>Departamento</label>
          <input type="text" />
        </div>
        <div>
          <label>Teléfono</label>
          <input type="tel" />
        </div>
      </div>
    </div>
  );
}
