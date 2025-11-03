// app.js
import express from "express";
import cors from "cors";
import clienteRuta from '../Backend/rutas/rutasCliente.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// para mandar a llamar las rutas que tiene clientes y sus metodos http
app.use('/api/clientes', clienteRuta);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);
