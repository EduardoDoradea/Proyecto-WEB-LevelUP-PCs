
import productoDAO from "../baseDatos/DAO/productoDAO.js";

//CREACION DE PRODUCTO 
export const crearNuevoProducto = async (req, res) => {
    try {
        const nuevoProducto = req.body;
        
        await productoDAO.crearNuevoProducto(nuevoProducto);
        res.status(201).json({ mensaje: "Producto registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el producto." });
    }
}

//MOSTRAR PRODUCTO 
export const mostrarProductos = async (req, res) => {
    try {
        const productos = await productoDAO.mostrarProductos();
        res.json({ productos })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar todos los productos en existencia. " })
    }
}

//OBTENER EL PRODUCTO POR EL NOMBRE 
export const mostrarProductoPorNombre = async (req, res) => {
    try {
        const nombreProducto = req.body;

        const productosNombre = await productoDAO.mostrarProductoPorNombre(nombreProducto)
        res.json({ productosNombre })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar el producto con ese nombre. " })
    }
}

//ACTUALIZAR EL STOCK DEL PRODUCTO POR MEDIO DEL ID
export const actualizarStockProducto = async (req, res) => {
    try {
        const idProducto = parseInt(req.params.idProducto)
        const cantidadProducto = req.body;

        await productoDAO.crearNuevoProducto(idProducto, cantidadProducto);
        res.status(201).json({ mensaje: "Se ha actualizado el producto exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el producto ." });
    }
}

//ELIMINAR PRODUCTO POR EL NOMBRE 
export const eliminarProducto = async (req, res) => {
    try {
        const nombreProducto = req.body;
        
        await productoDAO.eliminarProducto(nombreProducto);
        res.status(201).json({ mensaje: "Se ha eliminado el producto exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el producto." });
    }
}
