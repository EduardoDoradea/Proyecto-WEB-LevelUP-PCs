
//Importamos el metodo para la conexion a la base de datos y tambien el paquete de mssql, de la carpeta de configuracion
import { getConexion, sql } from "../configSQL.js"

//Este archivo tendra la autenticacion y la informacion del cliente
export const registroCliente = async (cliente) => {
    try {
        // desestructurando el objeto
        const { correo, edad, nombreUsuario, contrasenia, nombre, telefono } = cliente

        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();
        
        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("correo", sql.NVarChar, correo)
            .input("edad", sql.Int, edad)
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("contrasenia", sql.NVarChar, contrasenia)
            .input("nombre", sql.NVarChar, nombre)
            .input("telefono", sql.Int, telefono)
            .query("INSERT INTO Cliente (correo, edad, nombreUsuario, constrasenia, nombre, telefono) "
                + " VALUES (@correo, @edad, @nombreUsuario, @constrasenia, @nombre, @telefono)");
        //Mostrando las lineas afectadas 
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("Error en el registro del cliente" + error);
    }
}

/*Pensando si dejar esta funcion*/
export const obtenerClienteId = async (id_cliente) => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();
        
        const resultado = await pool.request()
            .input("id_cliente", sql.BigInt, id_cliente)
            .query("(SELECT idCliente, nombre, correo, nombreUsuario, contrasenia, telefono, edad) "
                +"FROM Cliente WHERE idCliente = id_cliente");
            
            return resultado.recordset;
    } catch (error) {
        console.error("Error en obtener el id del cliente" + error);
    }
}

export const obtenerClienteCorreo = async (correo_cliente) => {
try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();
        
        const resultado = await pool.request()
            .input("correo_cliente", sql.NVarChar, correo_cliente)
            .query("(SELECT idCliente, nombre, correo, nombreUsuario, contrasenia, telefono, edad) "
                +"FROM Cliente WHERE correo LIKE correo_cliente");
            //devolvemos un arreglo de un solo objeto con el correo que se le pasa, y se muestran los atributos que tiene ese correo 
            return resultado.recordset[0];
    } catch (error) {
        console.error("Error en la busqueda del cliente por correo." + error);
    }
}

export const actualizarClientePerfil = async (id_cliente, datos) => {
    try {
        // UNICAMENTE ESTOS CAMPOS SE ACTUALIZARAN 
        const { correo, edad, nombreUsuario, telefono } = datos

        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();
        
        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("id_cliente", sql.BigInt, id_cliente)
            .input("correo", sql.NVarChar, correo)
            .input("edad", sql.Int, edad)
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("telefono", sql.Int, telefono)
            .query("UPDATE INTO Cliente (correo, edad, nombreUsuario, nombre, telefono) "
                + " VALUES (@correo, @edad, @nombreUsuario, @nombre, @telefono)");
        //Mostrando las lineas afectadas 
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("Error en la actualizacion de datos del cliente" + error);
    }
}
