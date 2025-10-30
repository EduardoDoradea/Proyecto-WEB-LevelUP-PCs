// app.js
import express from "express";
import cors from "cors";
import clienteRuta from '../Backend/rutas/rutasCliente.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);




