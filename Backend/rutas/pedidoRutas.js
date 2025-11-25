import { Router } from "express";
import { verifyToken } from "../middleware/token.js";
import * as controladorPedido from "../controladores/pedidoControlador.js";

const router = Router();

// Ya no necesita :idCliente porque lo obtiene del token
router.post("/registroPedido", verifyToken, controladorPedido.compraFacturacion);

export default router;