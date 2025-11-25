import { Router } from "express";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

// Ahora el controlador se encarga de verificar si viene el idCliente en el body.
router.post("/registroPedido", controladorPedido.compraFacturacion);

export default router;