
import proveedorDAO from "../baseDatos/DAO/proveedorDAO.js";

//CREACION DE PRODUCTO 
export const crearNuevoProveedor = async (req, res) => {
    try {
        const nuevoProveedor = req.body;
        
        await proveedorDAO.registrarProveedor(nuevoProveedor);
        res.status(201).json({ mensaje: "Producto registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el producto." });
    }
}


