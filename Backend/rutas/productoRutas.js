// productoRoutes.js
import { Router } from "express";
import * as controladorProducto from "../controladores/productoControlador.js";

const router = Router();

router.get("/", controladorProducto.getProductos); 

export default router;