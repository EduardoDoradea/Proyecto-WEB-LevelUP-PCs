
import { Router } from "express";
import * as controladorCliente from "../controladores/clienteControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Cliente)
router.post('/registroCliente', controladorCliente.registroCliente);
router.post('/iniciarSesionCliente', controladorCliente.inicioSesionCliente);
router.get('/mostrarClientes', controladorCliente.mostrarClientes);
router.get('/mostrarClienteId/:idCliente', controladorCliente.mostrarClientePorId);
router.put('/actualizarCliente/:idCliente', controladorCliente.actualizarCliente);
router.delete('/eliminarCliente/:nombreUsuario', controladorCliente.eliminarClienteNombreUsuario);

export default router;