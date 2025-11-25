
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

export const actualizarContrasenia = async (req, res) => {
    try {
        console.log("--- DEBUG REGISTRO ---");

        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ error: "Faltan datos: correo y password son obligatorios" });
        }

        console.log("Actualizando contrasenia para:", correo);

        await clienteDAO.actualizarContrasenia(correo, password);

        res.status(201).json({ mensaje: "La contraseña del cliente ha sido actualizada." });

    } catch (error) {
        console.error("Error en actualizar:", error);
        res.status(500).json({ error: "No se logro actualizar la contrasenia del cliente." });
    }
}

export const obtenerPerfil = async (req, res) => {
    try {
        const { id } = req.params;

        const datosCliente = await clienteDAO.mostrarDatosCliente(id);

        if (!datosCliente) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(datosCliente);

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
};