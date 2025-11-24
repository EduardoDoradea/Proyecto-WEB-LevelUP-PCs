
import bcrypt from 'bcrypt';

const hashPassword = async (contrasenia) => {
    return await bcrypt.hash(String(contrasenia), 10);
}

const comparePassword = async (contraseniaIngresada, hashGuardado) => {
    return await bcrypt.compare(String(contraseniaIngresada), hashGuardado);
}

export default { hashPassword, comparePassword };