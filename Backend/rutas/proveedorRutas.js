
import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorProveedor from "../controladores/proveedorControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Proveedor)
router.post('/registroProveedor', verifyToken, controladorProveedor.crearNuevoProveedor);
router.get('/mostrarProveedores', verifyToken, controladorProveedor.mostrarTodosProveedores);
router.get('/mostrarProveedor', verifyToken, controladorProveedor.mostrarProveedor);
router.put('/actualizarProveedor/:idProveedor', verifyToken, controladorProveedor.actualizarProveedor);
router.delete('/eliminarProveedor/:idProveedor', verifyToken, controladorProveedor.eliminarProveedor);

export default router;
