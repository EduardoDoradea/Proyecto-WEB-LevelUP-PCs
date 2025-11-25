
import { Router } from "express";
import { verifyToken } from "../middleware/token.js"
import * as controladorCarrito from "../controladores/detalleCarritoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para DetalleCarrito)
router.post('/registroCarrito', verifyToken, controladorCarrito.crearNuevoCarrito);
router.get('/mostrarDetalleCarrito', verifyToken, controladorCarrito.mostrarCarrito);
router.put('/actualizarCantidadCarrito', verifyToken, controladorCarrito.actualizarCantidadCarrito);
router.delete('/eliminarCarrito/:idDetalleCarrito', verifyToken, controladorCarrito.eliminarCarrito);

export default router;
