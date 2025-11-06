
import { Router } from "express";
import * as controladorCarrito from "../controladores/detalleCarritoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para DetalleCarrito)
router.post('/registroCarrito', controladorCarrito.crearNuevoCarrito);
router.get('/mostrarDetalleCarrito', controladorCarrito.mostrarCarrito);
router.put('/actualizarCantidadCarrito', controladorCarrito.actualizarCantidadCarrito);
router.delete('/eliminarCarrito/:idDetalleCarrito', controladorCarrito.eliminarCarrito);

export default router;
