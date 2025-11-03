
import { getConexion, sql } from "../configSQL.js"

//REGISTRO PEDIDO
export const registrarPedido = async (pedido) => {
    try {

        const { nombre, telefono, correo } = pedido
        
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("nombre", sql.NVarChar, nombre)
            .input("telefono", sql.NVarChar, telefono)
            .input("correo", sql.NVarChar, correo)
            .query(`INSERT INTO Proveedor(nombre, telefono, correo)
            VALUES(nombre, telefono, correo) RETURNING idProveedor`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el proveedor. " + error);
    }
}

//MOSTRAR TODOS LOS PEDIDOS 
export const mostrarTodosPedidos = async () => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .query(`SELECT * FROM Pedido`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado mostrar los pedidos. " + error);
    }
}

//MOSTRAR TODOS LOS PEDIDOS DE UN CLIENTE
export const mostrarTodosPedidosCliente = async (nombreUsuario) => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .query(`SELECT pe.idPedido, pe.direccionEntrega, pe.fechaPedido, pe.estadoPedido, pe.totalPago
                    FROM Pedido AS pe
                    INNER JOIN Cliente AS cli ON pe.idCliente = cli.idCliente
                    WHERE cli.nombreUsuario = @nombreUsuario`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("Error el Usuario no se ha encontrado. " + error);
    }
}

//MOSTRAR PEDIDO MEDIANTE SU IDPEDIDO
export const mostrarPedidoPorId = async (idPedido) => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idPedido", sql.BigInt, idPedido)
            .query(`SELECT * 
                FROM Pedido
                WHERE idPedido = @idPedido`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado mostrar el pedido del id proporcionado. " + error);
    }
}

//Actualizar Pedido por nombreUsuario y el id pedido (estoy pensando como hacerlo)
export const actualizarPedido = async (datosBuscar, datosActualizar) => {
    try {
        const { nombreUsuario, idPedido } = datosBuscar
        const { direccionEntrega, fechaPedido, estadoPedido, totalPago } = datosActualizar
        
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("idPedido", sql.BigInt, idPedido)
            .query(``)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado mostrar los pedidos. " + error);
    }
}

//ELIMINAR PEDIDO
export const eliminarPedido = async (idPedido) => {
    try {

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idPedido", sql.BigInt, idPedido)
            .query(`DELETE FROM Pedido 
                    WHERE idPedido = @idPedido`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado eliminar el pedido. " + error);
    }
}