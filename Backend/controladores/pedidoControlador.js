
import * as pedidoDAO from "../baseDatos/DAO/pedidoDAO.js"

//REGISTRO DE PEDIDO
export const crearNuevoPedido = async (req, res) => {
    try {
        const nuevoPedido = req.body;
        
        await pedidoDAO.registrarPedido(nuevoPedido);
        res.status(201).json({ mensaje: "Pedido registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el pedido." });
    }
}