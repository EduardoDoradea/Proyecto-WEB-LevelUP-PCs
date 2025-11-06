
import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorProducto from "../controladores/productoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Producto)
router.post('/registroProducto', verifyToken, controladorProducto.crearNuevoProducto);
router.get('/mostrarProductos', verifyToken, controladorProducto.mostrarProductos);
router.get('/mostrarProductoNombre', verifyToken, controladorProducto.mostrarProductoPorNombre);
router.put('/actualizarStock/:idProducto', verifyToken, controladorProducto.actualizarStockProducto);
router.delete('/eliminarProducto', verifyToken, controladorProducto.eliminarProducto);

export default router;
