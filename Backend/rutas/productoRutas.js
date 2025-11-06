
import { Router } from "express";
import * as controladorProducto from "../controladores/productoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Producto)
router.post('/registroProducto', controladorProducto.crearNuevoProducto);
router.get('/mostrarProductos', controladorProducto.mostrarProductos);
router.get('/mostrarProductoNombre', controladorProducto.mostrarProductoPorNombre);
router.put('/actualizarStock/:idProducto', controladorProducto.actualizarStockProducto);
router.delete('/eliminarProducto', controladorProducto.eliminarProducto);

export default router;
