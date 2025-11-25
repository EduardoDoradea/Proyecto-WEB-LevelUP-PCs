// productoControlador.js
import * as productoDAO from "../baseDatos/DAO/productoDAO.js";

export const getProductos = async (req, res) => {
    try {
        const { tipo, idMarca } = req.query;

        console.log("Filtros recibidos:", { tipo, idMarca });

        const productos = await productoDAO.obtenerProductosConFiltros({ tipo, idMarca });

        res.status(200).json(productos);

    } catch (error) {
        console.error("Error obteniendo productos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};