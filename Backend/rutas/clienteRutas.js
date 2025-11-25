
import { Router } from "express";
import { verifyToken } from "../middleware/token.js"
import * as controladorCliente from "../controladores/clienteControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Cliente)
router.post('/registroCliente', controladorCliente.registroCliente);
router.post('/iniciarSesionCliente', controladorCliente.inicioSesionCliente);
router.post('/actualizarContra', controladorCliente.verificarCorreoExistente);

export default router;