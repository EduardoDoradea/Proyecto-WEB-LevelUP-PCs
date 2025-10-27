//importando el paquete de mssql para utilizar la conexion de sql 
import mssql from "mssql";

const conexionConfig = {
    server: "localhost",
    database: "DB_ProyectoWeb",
    user: "admin_seguro",
    password: "12345678",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConexion() {
    try{
        return await mssql.connect(conexionConfig);
    }catch(error){
        console.error(error);
    }
}

export { mssql };