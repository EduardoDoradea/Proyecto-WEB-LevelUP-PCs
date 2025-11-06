
import { Router } from "express";
import * as controladorProveedor from "../controladores/proveedorControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Proveedor)
router.post('/registroProveedor', controladorProveedor.crearNuevoProveedor);
router.get('/mostrarProveedores', controladorProveedor.mostrarTodosProveedores);
router.get('/mostrarProveedor', controladorProveedor.mostrarProveedor);
router.put('/actualizarProveedor/:idProveedor', controladorProveedor.actualizarProveedor);
router.delete('/eliminarProveedor/:idProveedor', controladorProveedor.eliminarProveedor);

export default router;
