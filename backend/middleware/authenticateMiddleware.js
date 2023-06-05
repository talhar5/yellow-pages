import { config } from '../config.js';
import jwt from 'jsonwebtoken';


function authenticateMiddleware(req, res, next) {

    let authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            error: "Login required"
        })
    }
    let jwtToken = authorization.split(' ')[1];

    try {
        // checking if the token is expired or not
        let expirationTime = jwt.decode(jwtToken, config.JWT_SECRET).exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > expirationTime) {
            return res.status(401).json({
                message: "Token has expired"
            })
        }
        let decoded = jwt.decode(jwtToken, config.JWT_SECRET);
        req.claims = { userId: decoded.id };
    } catch (err) {
        return res.status(500).json({
            error: "Error occured in authenticateMiddleware",
            error: err
        })
    }
    next()
}

export default authenticateMiddleware;