
import { getConexion, sql } from "../configSQL.js"

//REGISTRO PEDIDO
export const registrarPedido = async (pedido) => {
    try {

        const { direccionEntrega, fechaPedido, estadoPedido, totalPago, idMetodoPago, idCliente } = pedido

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("direccionEntrega", sql.NVarChar, direccionEntrega)
            .input("fechaPedido", sql.Date, fechaPedido)
            .input("estadoPedido", sql.VarChar, estadoPedido)
            .input("totalPago", sql.Decimal, totalPago)
            .input("idMetodoPago", sql.BigInt, idMetodoPago)
            .input("idCliente", sql.BigInt, idCliente)
            .query(`INSERT INTO Pedido(direccionEntrega, fechaPedido, estadoPedido, totalPago, idMetodoPago, idCliente)
            VALUES(@direccionEntrega, @fechaPedido, @estadoPedido, @totalPago, @idMetodoPago, @idCliente)`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el pedido. " + error);
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
            .input("direccionEntrega", sql.NVarChar, direccionEntrega)
            .input("fechaPedido", sql.Date, fechaPedido)
            .input("estadoPedido", sql.VarChar, estadoPedido)
            .input("totalPago", sql.Decimal, totalPago)
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("idPedido", sql.BigInt, idPedido)
            .query(`UPDATE pe
                    SET 
                    pe.direccionEntrega = @direccionEntrega,
                    pe.fechaPedido = @fechaPedido,
                    pe.estadoPedido = @estadoPedido, 
                    pe.totalPago = @totalPago
                    FROM Pedido AS pe
                    INNER JOIN Cliente AS cli ON pe.idCliente = cli.idCliente
                    WHERE cli.nombreUsuario = @nombreUsuario AND pe.idPedido = @idPedido
                    `)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se ha logrado actualizar el pedido. " + error);
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