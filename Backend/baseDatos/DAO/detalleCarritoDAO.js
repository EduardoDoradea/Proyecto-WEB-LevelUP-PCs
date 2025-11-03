
import { getConexion, sql } from "../configSQL.js"

//REGISTRO CARRITO
export const registroCarrito = async (carrito) => {
    try {
        const { idPedido, idProducto, cantidad } = carrito
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("idPedido", sql.BigInt, idPedido)
            .input("idProducto", sql.BigInt, idProducto)
            .input("cantidad", sql.Int, cantidad)
            .query(`INSERT INTO DetalleCarrito (idPedido, idProducto, cantidad)
                VALUES (@idPedido, @idProducto, @cantidad)`);
        
        console.log("Se ha logrado insertar el detalle del carrito con exito! " + resultado.rowsAffected);
    } catch (error) {
        console.error("Error en la insercion del detalle carrito. " + error);
    }
}

//MOSTRAR CARRITO por idPedido
export const mostrarCarrito = async (idPedido) => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("idPedido", sql.BigInt, idPedido)
            .query(`SELECT * 
                    FROM DetalleCarrito 
                    WHERE idPedido = @idPedido`);
        //Mostrando las lineas afectadas 
        console.log("Se han mostrado el detalle del carrito del idPedido " + resultado.rowsAffected);
    } catch (error) {
        console.error("Error en mostrar el detalle del carrito " + error);
    }
}

//ACTUALIZAR CANTIDAD DEL CARRITO POR IDPEDIDO
export const actualizarCantidadCarrito = async (idPedido, cantidadActualizar) => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("idPedido", sql.BigInt, idPedido)
            .input("cantidad", sql.Int, cantidadActualizar)
            .query(`UPDATE DetalleCarrito
                    SET cantidad = @cantidad
                    WHERE idPedido = @idPedido`);
        //Mostrando las lineas afectadas 
        console.log("Se ha logrado actualizar el campo de cantidad por el idPedido " + resultado.rowsAffected);
    } catch (error) {
        console.error("Error en actualizar el campo cantidad por el idPedido" + error);
    }
}

//ELIMINAR DETALLE CARRITO
export const eliminarCarrito = async (idDetalleCarrito) => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("idDetalleCarrito", sql.BigInt, idDetalleCarrito)
            .query(`DELETE FROM DetalleCarrito 
                WHERE idDetalleCarrito = @idDetalleCarrito`);
        //Mostrando las lineas afectadas 
        console.log("Se ha logrado eliminar el carrito " + resultado.rowsAffected);
    } catch (error) {
        console.error("Error en eliminar el carrito " + error);
    }
}

