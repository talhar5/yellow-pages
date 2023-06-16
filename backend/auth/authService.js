import userService from "../user/userService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js'
import nodemailer from 'nodemailer'
import optGenerator from 'otp-generator';



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

function generateJwtToken({ userId, email }) {
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

// function to generate opt 
function generateOtp() {
    return optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true
    })
}

async function sendOtpEmail(email, otp, done) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.MAIL_USERNAME,
            pass: config.MAIL_PASSWORD,
        }
    })
    transporter.sendMail({
        from: 'notes.application.noreply@gmail.com',
        to: email,
        subject: 'OTP - Notes',
        html: `<b>Your OTP is ${otp}</b>`
    }, (err, result) => {
        if (err) {
            return done(err)
        }
        return done(null, {
            code: 200,
            message: 'Message sent successfully',
            info: result
        })
    })
}

export default {
    regsiterUser,
    generateJwtToken,
    sendOtpEmail,
    generateOtp
}