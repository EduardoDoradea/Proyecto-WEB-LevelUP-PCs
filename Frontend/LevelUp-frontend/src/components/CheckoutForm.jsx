import React, { useState } from "react";
import "../styles/CheckoutForm.css";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    casa: "",
    municipio: "",
    departamento: "",
    telefono: "",
    tarjetaNumero: "",
    tarjetaVencimiento: "",
    tarjetaCCV: "",
    titular: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Compra realizada con éxito 🎉");
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h1 className="checkout-title">Dirección de facturación</h1>

      <div className="row">
        <div className="field">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Apellidos</label>
          <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label>Dirección</label>
        <input name="direccion" value={form.direccion} onChange={handleChange} required />
      </div>

      <div className="row">
        <div className="field">
          <label>Casa / Apt.</label>
          <input name="casa" value={form.casa} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Municipio</label>
          <input name="municipio" value={form.municipio} onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>Departamento</label>
          <input name="departamento" value={form.departamento} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </div>
      </div>

      <h2 className="section-title">Pago con tarjeta</h2>

      <div className="field">
        <label>Número de tarjeta</label>
        <input
          name="tarjetaNumero"
          placeholder="#### #### #### ####"
          maxLength="19"
          value={form.tarjetaNumero}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="field">
          <label>Fecha de vencimiento</label>
          <input name="tarjetaVencimiento" placeholder="MM/AA" value={form.tarjetaVencimiento} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>CCV</label>
            <input name="tarjetaCCV" maxLength="3" value={form.tarjetaCCV} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label>Titular</label>
        <input name="titular" value={form.titular} onChange={handleChange} required />
      </div>

      <button className="primary-btn" type="submit">Pagar ahora</button>
    </form>
  );
}
