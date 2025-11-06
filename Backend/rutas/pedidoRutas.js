
import { Router } from "express";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

// rutas para poder realizar operaciones http con el cliente-servidor (rutas para Pedido)
router.post('/registroCliente', controladorPedido.crearNuevoPedido);
router.get('/mostrarPedidos', controladorPedido.mostrarPedidos);
router.get('/mostrarPedidoCliente', controladorPedido.mostrarPedidosCliente);
router.get('/mostrarPedidoPorId/:idPedido', controladorPedido.mostrarPedidosPorId);
router.put('/actualizarPedido', controladorPedido.actualizarPedido);
router.delete('/eliminarCliente/:nombreUsuario', controladorPedido.eliminarPedido);

export default router;
