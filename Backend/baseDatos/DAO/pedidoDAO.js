
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
            .input("numTarjeta", sql.NVarChar, tarjeta.numTarjeta)
            .input("fechaVencimiento", sql.NVarChar, tarjeta.fechaVencimiento) 
            .input("CCV", sql.NVarChar, tarjeta.ccv)
            .input("titular", sql.NVarChar, tarjeta.titular)
            .query(`
                INSERT INTO TarjetaCredito (numTarjeta, fechaVencimiento, CCV, titular)
                OUTPUT INSERTED.idTarjeta  -- <-- CRÍTICO: Obtiene el ID generado
                VALUES (@numTarjeta, @fechaVencimiento, @CCV, @titular);
            `);
        
        const idTarjetaNueva = resultTarjeta.recordset[0].idTarjeta;

        const requestPedido = new sql.Request(transaction);
        const resultPedido = await requestPedido
            .input("direccionEntrega", sql.NVarChar, direccionEntrega)
            .input("idCliente", sql.Int, idCliente)
            .input("idTarjeta", sql.Int, idTarjetaNueva)
            .query(`
                INSERT INTO Pedido (direccionEntrega, idCliente, idTarjeta)
                OUTPUT INSERTED.idPedido  -- <-- CRÍTICO: Obtiene el ID generado
                VALUES (@direccionEntrega, @idCliente, @idTarjeta);
                -- fechaPedido tiene un valor DEFAULT, no hace falta insertarlo
            `);

        const idPedidoNuevo = resultPedido.recordset[0].idPedido;

        for (const item of carrito) {
            const requestDetalle = new sql.Request(transaction);
            await requestDetalle
                .input("idPedido", sql.Int, idPedidoNuevo)
                .input("idProducto", sql.Int, item.idProducto)
                .input("cantidad", sql.Int, item.cantidad) 
                .query(`
                    INSERT INTO DetallePedido (idPedido, idProducto, cantidad)
                    VALUES (@idPedido, @idProducto, @cantidad)
                `);
        }

        await transaction.commit();
        
        return { idPedido: idPedidoNuevo, mensaje: "Pedido procesado correctamente" };

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en registroPedidoCompleto:", error);
        throw error;
    }
};