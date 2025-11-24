
//Importamos el metodo para la conexion a la base de datos y tambien el paquete de mssql, de la carpeta de configuracion
import { getConexion, sql } from "../configSQL.js";
import hash from "../../utils/funcionHash.js"



export const registroCliente = async (cliente) => {
    try {
        // desestructurando el objeto
        const { correo, nombreUsuario, contrasenia, nombre, telefono } = cliente
        
        const hashedContrasenia = await hash.hashPassword(contrasenia);

        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("correo", sql.NVarChar, correo)
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("contrasenia", sql.NVarChar, hashedContrasenia)
            .input("nombre", sql.NVarChar, nombre)
            .input("telefono", sql.Int, telefono)
            .query(`INSERT INTO Cliente (correo, nombreUsuario, contrasenia, nombre, telefono)
                VALUES (@correo, @nombreUsuario, @contrasenia, @nombre, @telefono)`);
        //Mostrando las lineas afectadas 
        console.log("Se ha logrado insertar el nuevo cliente con exito! " + resultado.rowsAffected);
    } catch (error) {
        console.error("Error en el registro del cliente" + error);
    }
}

//INICIO DE SESION PARA EL CLIENTE
export const inicioSesionCliente = async (datos) => {
    try {
        const { correo } = datos;
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("correo", sql.NVarChar, correo)
            .query(`SELECT nombreUsuario, contrasenia
                FROM Cliente WHERE correo = @correo`);
        //devolvemos un arreglo de un solo objeto con el correo que se le pasa, y se muestran los atributos que tiene ese correo 
        return resultado.recordset[0];
    } catch (error) {
        console.error("Error en el nombre de usuario o contraseña es incorrecto." + error);
    }
}

//MOSTRAR TODOS LOS CLIENTES 
export const mostrarClientes = async () => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        const resultado = await pool.request()
            .query(`SELECT * FROM Cliente`);

        return resultado.recordset;
    } catch (error) {
        console.error("Error en mostrar los clientes" + error);
    }
}

/*Pensando si dejar esta funcion*/
export const mostrarClienteId = async (idCliente) => {
    try {
        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idCliente", sql.BigInt, idCliente)
            .query(`SELECT idCliente, nombre, correo, nombreUsuario, contrasenia, telefono 
                    FROM Cliente WHERE idCliente = @idCliente`);

        return resultado.recordset;
    } catch (error) {
        console.error("Error en obtener el id del cliente" + error);
    }
}

//ACTUALIZAR UN CLIENTE
export const actualizarClientePerfil = async (idCliente, datos) => {
    try {
        // UNICAMENTE ESTOS CAMPOS SE ACTUALIZARAN 
        const { correo, nombreUsuario, contrasenia, telefono } = datos

        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        if (contrasenia) {

            const hashedContrasenia = await hash.hashPassword(contrasenia);

            //Insertando los datos del objeto en la base de datos
            const resultado = await pool.request()
                .input("idCliente", sql.BigInt, idCliente)
                .input("correo", sql.NVarChar, correo)
                .input("nombreUsuario", sql.NVarChar, nombreUsuario)
                .input("contrasenia", sql.NVarChar, hashedContrasenia)
                .input("telefono", sql.Int, telefono)
                .query(`UPDATE Cliente 
                SET correo = @correo,
                nombreUsuario = @nombreUsuario,
                contrasenia = @contrasenia,
                telefono = @telefono
                WHERE idCliente = @idCliente
                `);
            console.log("Se ha logrado actualizar al cliente. " + resultado.rowsAffected);
        } else {
            //Insertando los datos del objeto en la base de datos
            const resultado = await pool.request()
                .input("idCliente", sql.BigInt, idCliente)
                .input("correo", sql.NVarChar, correo)
                .input("nombreUsuario", sql.NVarChar, nombreUsuario)
                .input("telefono", sql.Int, telefono)
                .query(`UPDATE Cliente 
                SET correo = @correo,
                nombreUsuario = @nombreUsuario,
                telefono = @telefono
                WHERE idCliente = @idCliente
                `);
            console.log("Se ha logrado actualizar al cliente. " + resultado.recordset);
        }

    } catch (error) {
        console.error("Error en la actualizacion de datos del cliente " + error);
    }
}

//ELIMINAR UN CLIENTE
export const eliminarClientePerfil = async (nombreUsuario) => {
    try {
        // UNICAMENTE ESTOS CAMPOS SE ACTUALIZARAN 

        //Objeto para poder utilizar la base de datos
        const pool = await getConexion();

        //Insertando los datos del objeto en la base de datos
        const resultado = await pool.request()
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .query(`DELETE FROM Cliente 
                WHERE nombreUsuario = @nombreUsuario`);
        //Mostrando las lineas afectadas  
        console.log(resultado.rowsAffected);
    } catch (error) {
        console.error("Error en la actualizacion de datos del cliente" + error);
    }
}
