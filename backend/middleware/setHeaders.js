import { config } from "../config.js";

function setHeaders(req, res, next) {
    const allowedOrigins = [config.ORIGIN]; // Add more origins if needed

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();

}
export default setHeaders;