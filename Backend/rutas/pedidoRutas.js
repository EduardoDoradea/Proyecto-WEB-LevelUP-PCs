
import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Pedido)
router.post('/registroCliente', verifyToken, controladorPedido.crearNuevoPedido);

export default router;
