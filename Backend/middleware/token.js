
import jwt from "jsonwebtoken";

export const JWT_SECRET = "your_jwt_secret";

// Middleware: Verify Token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No autorizado" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalido" });
        req.user = user;
        next();
    });
};