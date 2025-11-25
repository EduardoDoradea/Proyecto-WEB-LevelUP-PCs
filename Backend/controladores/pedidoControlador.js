
import * as pedidoDAO from "../baseDatos/DAO/pedidoDAO.js"

export const compraFacturacion = async (req, res) => {
    try { 
        const idCliente = req.params.idCliente;

        const { 
            direccion, 
            tarjeta,   
            carrito    
        } = req.body;

        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        const resultado = await pedidoDAO.registroPedidoCompleto({
            idCliente,
            direccionEntrega: direccion,
            tarjeta,
            carrito
        });

        res.status(200).json(resultado);

    } catch (error) {
        console.error("Error al procesar la compra:", error);
        res.status(500).json({ message: "Error interno al procesar el pedido" });
    }
};