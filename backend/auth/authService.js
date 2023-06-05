import userService from "../user/userService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config.js'



async function regsiterUser({ name, email, password }, done) {
    let hashedPassword = await bcrypt.hash(password, 10);
    userService.createUser({
        name,
        email,
        password: hashedPassword
    }, (err, result) => {
        if (err) return done(err);
        return done(null, result)
    })
}

function generateJwtToken({ userId, email}){
    let payload = {
        id: userId,
        email: email,
        role: 'USER'
    }
    let options = {
        expiresIn: "3h",
        issuer: "notes-app"
    }
    let token = jwt.sign(payload, config.JWT_SECRET, options);
    return token;
}


export default {
    regsiterUser, 
    generateJwtToken
}