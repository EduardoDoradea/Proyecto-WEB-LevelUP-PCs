//importando el paquete de mssql para utilizar la conexion de sql 
import sql from "mssql";

const conexionConfig = {
    server: "localhost",
    database: "DB_ProyectoWebFinal3",
    user: "sa", //cambiarlo dependiendo del usuario de la base
    password: "V3R6AZ0_", //contrasenia del usuario 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConexion() {
    try{
        return await sql.connect(conexionConfig);
    }catch(error){
        console.error(error);
    }
}

export { sql };