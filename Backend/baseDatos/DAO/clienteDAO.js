
//Importamos el metodo para la conexion a la base de datos y tambien el paquete de mssql, de la carpeta de configuracion
import { getConexion, sql } from "../configSQL.js";
import hash from "../../utils/funcionHash.js"

//REGISTRO DEL CLIENTE
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
        throw error;
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
        throw error;
    }
}
//ACTUALIZAR CONTRASENIA
export const actualizarContrasenia = async (correo, nuevaContrasenia) => {
    try {
        const pool = await getConexion();

        const hashedContrasenia = await hash.hashPassword(nuevaContrasenia);

        const resultado = await pool.request()
            .input("correo", sql.NVarChar, correo)
            .input("contrasenia", sql.NVarChar, hashedContrasenia)
            .query(`
                UPDATE Cliente 
                SET contrasenia = @contrasenia
                WHERE correo = @correo
            `);

        if (resultado.rowsAffected[0] === 0) {
            console.log("No se encontró ningún usuario con ese correo.");
            return false;
        }

        console.log("Se ha logrado cambiar la contraseña.");
        return true;
    } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        throw error;
    }
}

//MOSTRAR LOS DATOS DEL CLIENTE LOGEADO
export const mostrarDatosCliente = async (idCliente) => {
    try {
        const pool = await getConexion();

        const resultado = await pool.request()
            .input("idCliente", sql.Int, idCliente)
            .query(`
                SELECT idCliente, nombre, nombreUsuario, correo, telefono 
                FROM Cliente 
                WHERE idCliente = @idCliente
            `);

        if (resultado.recordset.length === 0) {
            console.log("Cliente no encontrado.");
            return null;
        }

        console.log("Se ha encontrado el cliente.");
        return resultado.recordset[0];

    } catch (error) {
        console.error("Error al buscar cliente: " + error);
        throw error;
    }
}