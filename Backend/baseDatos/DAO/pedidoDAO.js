
import { getConexion, sql} from "../configSQL";

export const crearPedido = async(pedido) => {
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
            .query(`INSERT INTO Pedido(direccionEntrega, fechaPedido, estadoPedido, totalPago, idMetodoPago, idCLiente)
            VALUES(@direccionEntrega, @fechaPedido, @estadoPedido, @totalPago, @idMetodoPago, @idCLiente)`)

        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("No se pudo registrar el producto. " + error);
    }
}