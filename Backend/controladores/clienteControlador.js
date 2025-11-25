
import * as clienteDAO from "../baseDatos/DAO/clienteDAO.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/token.js"
import contraseniaUtil from "../utils/funcionHash.js";

export const registroCliente = async (req, res) => {
    try {
        console.log("--- DEBUG REGISTRO ---");

        const { password, ...restoDatos } = req.body;

        console.log("Password recibida del front:", password);

        const clienteParaDAO = {
            ...restoDatos,
            contrasenia: password
        };

        await clienteDAO.registroCliente(clienteParaDAO);

        res.status(201).json({ mensaje: "Cliente registrado exitosamente." });

    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ error: "No se pudo registrar el cliente." });
    }
}

export const inicioSesionCliente = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        const clienteEncontrado = await clienteDAO.inicioSesionCliente({ correo });

        if (!clienteEncontrado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const contraseniaValida = await contraseniaUtil.comparePassword(contrasenia, clienteEncontrado.contrasenia);

        if (!contraseniaValida) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: clienteEncontrado.idCliente,
                email: clienteEncontrado.correo
            },
            JWT_SECRET,
            { expiresIn: "5h" }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.error("Error en el login backend:", error);
        res.status(500).json({ message: "Error en el servidor al iniciar sesión." });
    }
}

export const verificarCorreoExistente = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ message: "El campo 'correo' es requerido en el cuerpo de la solicitud." });
    }

    try {
        const resultado = await clienteDAO.verificarCorreoExistenteDAO(correo);

        if (resultado) {
            console.log(`Correo ${correo} encontrado.`);
            return res.status(200).json({message: "Correo existente."});
        } else {
            return res.status(404).json({ message: "Correo no registrado." });
        }
    } catch (error) {
        console.error(`Error al procesar la solicitud para el correo ${correo}:`, error.message);
        return res.status(500).json({ message: "Error interno del servidor al verificar el correo." });
    }
};
