
import * as clienteDAO from "../baseDatos/DAO/clienteDAO.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/token.js"
import contraseniaUtil from "../utils/funcionHash.js";

export const registroCliente = async (req, res) => {
    try {
        console.log("DEBUG");
        
        const { password, restoDatos } = req.body;

        console.log("Password recibida del front:", password); 

        const clienteParaDAO = {
            restoDatos,
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
        const { correo, password } = req.body;

        const clienteEncontrado = await clienteDAO.inicioSesionCliente({ correo });

        if (!clienteEncontrado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const contraseniaValida = await contraseniaUtil.comparePassword(password, clienteEncontrado.contrasenia);

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

export const actualizarCliente = async (req, res) => {
    try {
        const idCliente = parseInt(req.params.idCliente);
        const cliente = req.body;

        await clienteDAO.actualizarClientePerfil(idCliente, cliente);
        res.status(201).json({ mensaje: "Se ha actualizado con exito el cliente." })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo actualizar el cliente. " })
    }
}

