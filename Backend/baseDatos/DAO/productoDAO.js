
import { getConexion, sql } from "../configSQL.js"

// CREAR PRODUCTO
export const registrarProducto = async (producto) => {
    try {

        const { descripcion, precio, cantidad, tipo, idMarca, nombre } = producto

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("descripcion", sql.NVarChar, descripcion)
            .input("precio", sql.Decimal, precio)
            .input("cantidad", sql.Int, cantidad)
            .input("tipo", sql.NVarChar, tipo)
            .input("idMarca", sql.BigInt, idMarca)
            .input("nombre", sql.NVarChar, nombre)
            .query(`INSERT INTO Producto(descripcion, precio, cantidad, tipo, idMarca, nombre)
            VALUES(@descripcion, @precio, @cantidad, @tipo, @idMarca, @nombre)`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el producto. " + error);
    }
}

// ACTUALIZAR STOCK DEL NOMBRE
export const actualizarStockPorNombre = async (nombreProducto, cantidadProducto) => {
    try {

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("cantidad", sql.Int, cantidadProducto)
            .input("nombre", sql.NVarChar, nombreProducto)
            .query(`UPDATE Producto
            SET cantidad = @cantidad
            WHERE nombre = @nombre`)

        console.log("La actualizacion ha sido exitosa " + resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo actualizar el stock del producto. " + error);
    }
}

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

// ELIMINAR PRODUCTO
export const eliminarProductoPorNombre = async (nombreProducto) => {
    try {
        const pool = await getConexion();
        const resultado = await pool.request()
        .input("nombre", sql.NVarChar, nombreProducto)
        .query(`DELETE FROM Producto WHERE nombre = @nombre`);

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado eliminar el producto con ese nombre. " + error);
    }
}

