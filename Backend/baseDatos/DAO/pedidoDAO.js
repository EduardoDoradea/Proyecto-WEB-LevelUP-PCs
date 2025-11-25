
import { getConexion, sql } from "../configSQL.js"

export const registroPedidoCompleto = async (datos) => {
    const { 
        idCliente, 
        direccionEntrega, 
        tarjeta, 
        carrito  
    } = datos;

    const pool = await getConexion();
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        const requestTarjeta = new sql.Request(transaction);
        const resultTarjeta = await requestTarjeta
            .input("numTarjeta", sql.VarChar, tarjeta.numTarjeta)
            .input("fechaVencimiento", sql.VarChar, tarjeta.fechaVencimiento)
            .input("ccv", sql.VarChar, tarjeta.ccv)
            .input("titular", sql.VarChar, tarjeta.titular)
            .query(`
                INSERT INTO TarjetaCredito (numTarjeta, fechaVencimiento, ccv, titular)
                VALUES (@numTarjeta, @fechaVencimiento, @ccv, @titular);
                SELECT SCOPE_IDENTITY() as idTarjeta;
            `);
        
        const idTarjetaNueva = resultTarjeta.recordset[0].idTarjeta;

        const requestPedido = new sql.Request(transaction);
        const resultPedido = await requestPedido
            .input("direccionEntrega", sql.VarChar, direccionEntrega)
            .input("idCliente", sql.Int, idCliente)
            .input("idTarjeta", sql.Int, idTarjetaNueva)
            .query(`
                INSERT INTO Pedido (direccionEntrega, idCliente, idTarjeta, fechaPedido)
                VALUES (@direccionEntrega, @idCliente, @idTarjeta, GETDATE());
                SELECT SCOPE_IDENTITY() as idPedido;
            `);

        const idPedidoNuevo = resultPedido.recordset[0].idPedido;

        for (const item of carrito) {
            const requestDetalle = new sql.Request(transaction);
            await requestDetalle
                .input("idPedido", sql.Int, idPedidoNuevo)
                .input("idProducto", sql.Int, item.idProducto)
                .input("cantidad", sql.Int, item.cantidad)
                .input("precioUnitario", sql.Decimal(10, 2), item.precio)
                .query(`
                    INSERT INTO DetallePedido (idPedido, idProducto, cantidad, precioUnitario)
                    VALUES (@idPedido, @idProducto, @cantidad, @precioUnitario)
                `);
        }

        await transaction.commit();
        return { idPedido: idPedidoNuevo, mensaje: "Pedido procesado correctamente" };

    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
};