
import { Router } from "express";
import * as controladorCliente from "../controladores/clienteControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Cliente)
router.post('/registroCliente', controladorCliente.crearNuevoCliente);
router.post('/iniciarSesionCliente', controladorCliente.mostrarClienteCorreo);
router.get('/mostrarClientes', controladorCliente.mostrarClientes);
router.put('/actualizarCliente/:idCliente', controladorCliente.actualizarClientePerfil);
router.delete('/eliminarCliente/:nombreUsuario', controladorCliente.eliminarClienteNombreUsuario);

export default router;