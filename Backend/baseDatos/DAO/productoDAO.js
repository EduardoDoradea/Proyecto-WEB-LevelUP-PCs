
import { getConexion, sql } from "../configSQL.js"

// MOSTRAR TODOS LOS PRODUCTOS
export const obtenerTodosProductos = async () => {
    try {
        const pool = await getConexion();
        const resultado = await pool.request()
        .query(`SELECT * FROM Producto`);

        return resultado.recordset;
    } catch (error) {
        console.error("No se ha logrado actualizar el stock del producto. " + error);
    }
}

// MOSTRAR PRODUCTO POR NOMBRE
export const obtenerProductoPorNombre = async (nombreProducto) => {
    try {
        const pool = await getConexion();
        const resultado = await pool.request()
        .input("nombre", sql.NVarChar, nombreProducto)
        .query(`SELECT * FROM Producto WHERE nombre = @nombre`);

        return resultado.recordset;
    } catch (error) {
        console.error("No se ha encontrado el producto con ese nombre. " + error);
    }
}