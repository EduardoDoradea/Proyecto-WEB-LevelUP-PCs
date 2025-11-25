import * as pedidoDAO from "../baseDatos/DAO/pedidoDAO.js"


export const compraFacturacion = async (req, res) => {
    try { 
        // Obtener el ID del cliente desde el token JWT
        const idCliente = req.user.id;

        const { 
            direccion,
            tarjeta,
            carrito    
        } = req.body;

        // Validaciones
        if (!direccion || direccion.trim() === '') {
            return res.status(400).json({ 
                success: false,
                message: "La dirección de entrega es obligatoria" 
            });
        }

        if (!tarjeta || !tarjeta.numTarjeta || !tarjeta.fechaVencimiento || !tarjeta.ccv || !tarjeta.titular) {
            return res.status(400).json({ 
                success: false,
                message: "Todos los datos de la tarjeta son obligatorios" 
            });
        }

        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: "El carrito está vacío" 
            });
        }

        // Validar formato de cada item del carrito
        for (const item of carrito) {
            if (!item.idProducto || !item.cantidad || item.cantidad < 1) {
                return res.status(400).json({ 
                    success: false,
                    message: "Formato de carrito inválido. Cada producto debe tener idProducto y cantidad válida" 
                });
            }
        }

        // Procesar el pedido
        const resultado = await pedidoDAO.registroPedidoCompleto({
            idCliente,
            direccionEntrega: direccion,
            tarjeta: {
                numTarjeta: tarjeta.numTarjeta,
                fechaVencimiento: tarjeta.fechaVencimiento,
                ccv: tarjeta.ccv,
                titular: tarjeta.titular
            },
            carrito
        });

        res.status(200).json({ 
            success: true,
            message: "Pedido procesado exitosamente",
            ...resultado 
        });

    } catch (error) {
        console.error("Error al procesar la compra:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno al procesar el pedido",
            error: error.message 
        });
    }
};