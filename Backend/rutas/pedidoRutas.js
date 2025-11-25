
import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

router.post("/registroPedido", verifyToken, controladorPedido.compraFacturacion);

export default router;
