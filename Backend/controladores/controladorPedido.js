
import pedidoDAO from "../baseDatos/DAO/pedidoDAO.js"

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

//MOSTRAR LOS PEDIDOS 
export const mostrarPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoDAO.mostrarTodosPedidos();
        res.json({ pedidos })
    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el pedido." });
    }
}

//MOSTRAR PEDIDOS DE UN CLIENTE 
export const mostrarPedidosCliente = async (req, res) => {
    try {
        const nombreUsuario = req.params.nombreUsuario;
        const pedidosUsuario = await pedidoDAO.mostrarTodosPedidosCliente(nombreUsuario);
        res.json({ pedidosUsuario })
    } catch (error) {
        res.status(500).json({ error: "No se pudo mostrar el pedido de ese usuario." });
    }
}

//MOSTRAR PEDIDOS POR ID  
export const mostrarPedidosPorId = async (req, res) => {
    try {
        const idPedido = parseInt(req.params.idPedido);
        const pedidosID = await pedidoDAO.mostrarPedidoPorId(idPedido);
        res.json({ pedidosID })
    } catch (error) {
        res.status(500).json({ error: "No se pudo mostrar el pedido de ese id." });
    }
}

//ACTUALIZAR EL PEDIDO
export const actualizarStockProducto = async (req, res) => {
    try {
        const datosBuscar = {
            nombreUsuario: req.body.nombreUsuario,
            idPedido: req.body.idPedido
        };
        
        const datosActualizar = {
            direccionEntrega: req.body.direccionEntrega,
            fechaPedido: req.body.fechaPedido,
            estadoPedido: req.body.estadoPedido,
            totalPago: req.body.totalPago
        };

        await pedidoDAO.actualizarPedido(datosBuscar, datosActualizar);
        res.status(201).json({ mensaje: "Se ha actualizado el pedido exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el pedido." });
    }
}

//ELIMINAR EL PEDIDO 
export const eliminarPedido = async (req, res) => {
    try {
        const idPedido = parseInt(req.params.idPedido);
        
        await productoDAO.eliminarPedido(idPedido);
        res.status(201).json({ mensaje: "Se ha eliminado el pedido exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el pedido." });
    }
}
