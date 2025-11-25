
import { getConexion, sql } from "../configSQL.js"

//REGISTRO PEDIDO
export const registrarPedido = async (pedido) => {
    try {

        const { direccionEntrega, idCliente } = pedido

        const pool = await getConexion();

        const resultado = await pool.request()
            .input("direccionEntrega", sql.NVarChar, direccionEntrega)
            .input("idCliente", sql.BigInt, idCliente)
            .query(`INSERT INTO Pedido(direccionEntrega, fechaPedido, idCliente)
            VALUES(@direccionEntrega, NOW(), @idCliente)`)
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el pedido. " + error);
    }
}
