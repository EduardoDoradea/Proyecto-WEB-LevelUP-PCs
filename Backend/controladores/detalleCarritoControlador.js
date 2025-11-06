
import * as detalleCarritoDAO from "../baseDatos/DAO/detalleCarritoDAO.js";

//CREACION CARRITO 
export const crearNuevoCarrito = async (req, res) => {
    try {
        const nuevoCarrito = req.body;
        
        await detalleCarritoDAO.registroCarrito(nuevoCarrito);
        res.status(201).json({ mensaje: "Carrito registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el carrito." });
    }
}

//MOSTRAR CARRITO POR EL IdPedido
export const mostrarCarrito = async (req, res) => {
    try {
        const idPedido = parseInt(req.params.idPedido);

        const carrito = await detalleCarritoDAO.mostrarCarrito(idPedido);
        res.json({ carrito })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar el detalle del carrito con ese idPedido. " })
    }
}

//ACTUALIZAR LA CANTIDAD DEL CARRITO 
export const actualizarCantidadCarrito = async (req, res) => {
    try {
        const idPedido = parseInt(req.params.idPedido);
        const cantidad = req.body;

        await detalleCarritoDAO.actualizarCantidadCarrito(idPedido, cantidad);
        res.status(201).json({ mensaje: "Carrito actualizado exitosamente. "})
    } catch (error) {
        res.status(500).json({ errror: "No se pudo actualizar el carrito. " })
    }
}

//ELIMINAR CARRITO 
export const eliminarCarrito = async (req, res) => {
    try {
        const idCarrito = parseInt(req.params.idDetalleCarrito);

        await detalleCarritoDAO.eliminarCarrito(idCarrito);
        res.status(201).json({ mensaje: "Se ha eliminado el carrito exitosamente." });
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar el detalle del carrito con ese idPedido. " })
    }
}
