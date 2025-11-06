
import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Pedido)
router.post('/registroCliente', verifyToken, controladorPedido.crearNuevoPedido);
router.get('/mostrarPedidos', verifyToken, controladorPedido.mostrarPedidos);
router.get('/mostrarPedidoCliente', verifyToken, controladorPedido.mostrarPedidosCliente);
router.get('/mostrarPedidoPorId/:idPedido', verifyToken, controladorPedido.mostrarPedidosPorId);
router.put('/actualizarPedido', verifyToken, controladorPedido.actualizarPedido);
router.delete('/eliminarCliente/:nombreUsuario', verifyToken, controladorPedido.eliminarPedido);

export default router;
