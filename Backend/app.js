// app.js
import express from "express";
import cors from "cors";
import clienteRuta from './rutas/clienteRutas.js';
import productoRuta from './rutas/productoRutas.js';
import proveedorRuta from './rutas/proveedorRutas.js';
import pedidoRuta from './rutas/pedidoRutas.js';
import detalleCarritoRuta from './rutas/detalleCarritoRutas.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// para mandar a llamar las rutas y sus metodos http
app.use('/api/clientes', clienteRuta);
app.use('/api/productos', productoRuta);
app.use('/api/proveedores', proveedorRuta);
app.use('/api/pedidos', pedidoRuta);
app.use('/api/detalleCarrito', detalleCarritoRuta);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);
