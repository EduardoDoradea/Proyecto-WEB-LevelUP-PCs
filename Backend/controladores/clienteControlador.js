
import clienteDAO from "../baseDatos/DAO/clienteDAO.js";

export const crearNuevoCliente = async (req, res) => {
    try {
        const nuevoCliente = req.body;
        
        await clienteDAO.registroCliente(nuevoCliente);
        res.status(201).json({ mensaje: "Cliente registrado exitosamente." });

    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el cliente." });
    }
}

export const mostrarClientes = async (req, res) => {
    try {
        const clientes = await clienteDAO.mostrarClientes();
        res.json({ clientes })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar todos los clientes. " })
    }
}

export const mostrarClientePorId = async (req, res) => {
    try {
        const idCliente = parseInt(req.params.idCliente);

        const clientes = await clienteDAO.obtenerClienteId(idCliente);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar los clientes por id. " })
    }
}

//login no finalizado
export const mostrarClienteCorreo = async (req, res) => {
    try {
        const correo = req.body.correo;
        const contrasenia = req.body.contrasenia;

        await clienteDAO.obtenerClienteCorreo(correo, contrasenia);
        res.status(200).json({ mensaje: "Ha iniciado sesion con exito. " });
    } catch (error) {
        res.status(500).json({ errror: "No se pudo mostrar los clientes por correo. " })
    }
}

export const actualizarClientePerfil = async (req, res) => {
    try {
        const idCliente = parseInt(req.params.idCliente);
        const cliente = req.body;

        await clienteDAO.actualizarClientePerfil(idCliente, cliente);
        res.status(201).json({ mensaje: "Se ha actualizado con exito el cliente." })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo actualizar el cliente. " })
    }
}

export const eliminarClienteNombreUsuario = async (req, res) => {
    try {
        const nombreUsuario = req.params.nombreUsuario;

        await clienteDAO.eliminarCliente(nombreUsuario);
        res.status(201).json({ mensaje: "Se ha eliminado con exito el cliente." })
    } catch (error) {
        res.status(500).json({ errror: "No se pudo eliminar el cliente. " })
    }
}
