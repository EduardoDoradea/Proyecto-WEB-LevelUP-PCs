// Frontend/LevelUp-frontend/src/pages/TestAPI.jsx
// COMPONENTE TEMPORAL SOLO PARA PRUEBAS - ELIMINAR DESPUÉS

import { useState } from "react";
import api from "../utils/api";

export default function TestAPI() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log("🔄 Intentando conectar con: http://localhost:3000/api/producto");
      
      const res = await api.get('/api/producto');
      
      console.log("✅ Respuesta exitosa:", res.data);
      setResponse(res.data);
    } catch (err) {
      console.error("❌ Error:", err);
      
      const errorDetails = {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        url: err.config?.url,
        baseURL: err.config?.baseURL
      };
      
      console.error("Detalles del error:", errorDetails);
      setError(errorDetails);
    } finally {
      setLoading(false);
    }
  };

  const testWithFilters = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log("🔄 Probando con filtro tipo=Procesador");
      
      const res = await api.get('/api/producto', {
        params: { tipo: 'Procesador' }
      });
      
      console.log("✅ Respuesta con filtro:", res.data);
      setResponse(res.data);
    } catch (err) {
      console.error("❌ Error con filtro:", err);
      setError({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#000',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <h1 style={{ marginBottom: '2rem', color: '#00b4d8' }}>
        🧪 Prueba de Conexión con API
      </h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={testEndpoint}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            background: '#00b4d8',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '⏳ Cargando...' : '📡 Probar GET /api/producto'}
        </button>

        <button
          onClick={testWithFilters}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            background: '#9333ea',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '⏳ Cargando...' : '🔍 Probar con filtro (Procesador)'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '1.5rem',
          background: '#ff6b6b',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2>❌ Error en la conexión</h2>
          <pre style={{
            background: '#000',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
            {JSON.stringify(error, null, 2)}
          </pre>
          
          <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <h3>Checklist de diagnóstico:</h3>
            <ul>
              <li>✓ ¿El backend está corriendo? (npm start en Backend/)</li>
              <li>✓ ¿El puerto es 3000? Verifica en Backend/app.js</li>
              <li>✓ ¿CORS está habilitado? Verifica app.use(cors())</li>
              <li>✓ ¿La ruta es correcta? /api/producto</li>
              <li>✓ Prueba directo en el navegador: http://localhost:3000/api/producto</li>
            </ul>
          </div>
        </div>
      )}

      {response && (
        <div style={{
          padding: '1.5rem',
          background: 'rgba(0, 180, 216, 0.1)',
          border: '1px solid #00b4d8',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#00b4d8', marginBottom: '1rem' }}>
            ✅ Respuesta exitosa ({response.length} productos)
          </h2>
          
          {response.length > 0 ? (
            <>
              <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Primer producto (ejemplo):
              </h3>
              <pre style={{
                background: '#0a0a0a',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem'
              }}>
                {JSON.stringify(response[0], null, 2)}
              </pre>

              <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Todos los productos:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {response.map((product, index) => (
                  <div key={index} style={{
                    background: '#1a1a1a',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <h4 style={{ 
                      marginBottom: '0.5rem',
                      color: '#00b4d8',
                      fontSize: '0.9rem'
                    }}>
                      {product.nombre}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>
                      ID: {product.idProducto}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>
                      Marca: {product.marca}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>
                      Tipo: {product.tipo}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>
                      ${product.precio}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ color: '#ffc107' }}>
              ⚠️ La API responde pero no hay productos en la base de datos
            </p>
          )}
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#00b4d8' }}>
          📋 Información de configuración
        </h3>
        <ul style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
          <li><strong>URL Base API:</strong> http://localhost:3000</li>
          <li><strong>Endpoint:</strong> /api/producto</li>
          <li><strong>Archivo de configuración:</strong> Frontend/src/utils/api.js</li>
          <li><strong>Backend debe estar en:</strong> Backend/app.js (puerto 3000)</li>
        </ul>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#333',
        borderRadius: '4px',
        fontSize: '0.85rem'
      }}>
        <p><strong>💡 Tip:</strong> Abre la consola del navegador (F12) para ver más detalles de los requests</p>
      </div>
    </div>
  );
}