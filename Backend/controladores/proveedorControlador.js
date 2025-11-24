
import proveedorDAO from "../baseDatos/DAO/proveedorDAO.js";

//CREACION DE PROVEEDORES 
export const crearNuevoProveedor = async (req, res) => {
    try {
        const nuevoProveedor = req.body;
        
        await proveedorDAO.registrarProveedor(nuevoProveedor);
        res.status(201).json({ mensaje: "Producto registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el producto." });
    }
}

//MOSTRAR LOS PROVEEDORES
export const mostrarTodosProveedores = async (req, res) => {
    try {
        const proveedores = await proveedorDAO.mostrarProveedores();
        res.json({proveedores})
    } catch (error) {
        res.status(500).json({ error: "No se pudo mostrar los proveedores existentes." });
    }
}

//MOSTRAR UN PROVEEDOR
export const mostrarProveedor = async (req, res) => {
    try {
        const idProveedor = parseInt(req.params.idProducto)
        
        const proveedor = await proveedorDAO.mostrarProveedor(idProveedor);
        res.json({proveedor})
    } catch (error) {
        res.status(500).json({ error: "No se pudo mostrar el proveedor con ese id." });
    }
}

//ACTUALIZAR PROVEEDOR 
export const actualizarProveedor = async (req, res) => {
    try {
        const idProveedor = parseInt(req.params.idProducto)
        const datosProveedor = req.body;

        await proveedorDAO.actualizarProveedor(idProveedor, datosProveedor);
        res.status(201).json({ mensaje: "Se ha actualizado el proveedor exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el proveedor ." });
    }
}

//ELIMINAR PROVEEDOR
export const eliminarProveedor = async (req, res) => {
    try {
        const idProveedor = parseInt(req.params.idProducto)

        await proveedorDAO.eliminarProveedor(idProveedor);
        res.status(201).json({ mensaje: "Se ha eliminado el proveedor exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el proveedor ." });
    }
}
