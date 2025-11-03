
import { getConexion, sql } from "../configSQL.js"

//REGISTRO PROVEEDOR
export const registrarProveedor = async (proveedor) => {
    try {

        const { nombre, telefono, correo } = proveedor

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("nombre", sql.NVarChar, nombre)
            .input("telefono", sql.NVarChar, telefono)
            .input("correo", sql.NVarChar, correo)
            .query(`INSERT INTO Proveedor(nombre, telefono, correo)
            VALUES(@nombre, @telefono, @correo) RETURNING idProveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el proveedor. " + error);
    }
}

//MOSTRAR TODOS LOS PROVEEDORES
export const mostrarProveedores = async () => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .query(`SELECT * FROM Proveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo mostrar los proveedores. " + error);
    }
}

//MOSTRAR UN PROVEEDOR
export const mostrarProveedor = async (idProveedor) => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
        .input("idProveedor", sql.BigInt, idProveedor)
            .query(`SELECT * FROM Proveedor
                    WHERE idProveedor = @idProveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo mostrar los proveedores. " + error);
    }
}

//ACTUALIZAR PROVEEDOR
export const actualizarProveedor = async (idProveedor, proveedor) => {
    try {

        const { telefono, correo } = proveedor

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idProveedor", sql.BigInt, idProveedor)
            .input("telefono", sql.NVarChar, telefono)
            .input("correo", sql.NVarChar, correo)
            .query(`UPDATE Proveedor 
                    SET telefono = @telefono
                    correo = @correo
                    WHERE idProveedor = @idProveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el proveedor. " + error);
    }
}

//ELIMINAR PROVEEDOR
export const eliminarProveedor = async (idProveedor) => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idProveedor", sql.BigInt, idProveedor)
            .query(`DELETE FROM Proveedor 
                    WHERE idProveedor = @idProveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el proveedor. " + error);
    }
}