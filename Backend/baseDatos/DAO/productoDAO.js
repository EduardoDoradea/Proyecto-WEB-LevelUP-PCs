
import { getConexion, sql } from "../configSQL.js"

export const obtenerProductosConFiltros = async ({ tipo, idMarca }) => {
    const pool = await getConnection();
    const request = pool.request();
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
        WHERE 1 = 1 
    `;
    
    if (tipo) {
        request.input("tipo", sql.VarChar, tipo);
        query += " AND p.tipo = @tipo";
    }

    if (idMarca) {
        request.input("idMarca", sql.Int, idMarca);
        query += " AND p.idMarca = @idMarca";
    }

    const result = await request.query(query);
    return result.recordset;
};
