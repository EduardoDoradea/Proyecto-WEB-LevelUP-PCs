// Backend/baseDatos/DAO/productoDAO.js
import { getConexion, sql } from "../configSQL.js"

export const obtenerProductosConFiltros = async ({ tipo, idMarca }) => {
    const pool = await getConexion();
    const request = pool.request();
    
    // Query SIN la columna stock (porque no existe en tu tabla)
    let query = `
        SELECT 
            p.idProducto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.tipo,
            m.nombre as marca,
            i.url as imagen
        FROM Producto p
        JOIN Marca m ON p.idMarca = m.idMarca
        LEFT JOIN ImagenProducto i ON p.idProducto = i.idProducto
        WHERE 1 = 1`;
    
    if (tipo) {
        // Limpiar el tipo por si viene con saltos de línea
        const tipoLimpio = tipo.trim();
        request.input("tipo", sql.VarChar, tipoLimpio);
        query += " AND p.tipo = @tipo";
    }

    if (idMarca) {
        request.input("idMarca", sql.Int, idMarca);
        query += " AND p.idMarca = @idMarca";
    }

    const result = await request.query(query);
    return result.recordset;
};