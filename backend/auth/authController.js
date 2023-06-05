import userService from "../user/userService.js";
import authService from "./authService.js";
import bcrypt from 'bcrypt';
import cookie from 'cookie';



async function registerUser(req, res) {
    let {
        name,
        email,
        password
    } = req.body;
    // if one the fields is empty
    if (!(email && password && name)) {
        return res.status(400).json({
            error: "BAD REQUEST",
            message: 'Please enter credentials',
        })
    }
    // checking for duplicate email 
    userService.findUserByEmail(email, (err, result) => {
        if (err?.code === 500) {
            return res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                description: "An unexpected error occurred on the server",
                error: err.error
            })
        }
        if (result) {
            return res.status(409).json({
                message: "EMAIL ALREADY REGISTERED",
                description: "Email already registered"
            })
        }

        if (err.code === 404) { // when user is not registered already =>
            let userDetails = {
                name,
                email,
                password
            }
            authService.regsiterUser(userDetails, (err, result) => {
                if (err) {
                    if (err.code) {
                        return res.status(500).json({
                            description: "Internal server error",
                            error: err.error,
                        })
                    }
                }
                return res.status(201).json({
                    description: "user has been registered successfully"
                })
            })
        }
    })
}
async function loginUser(req, res) {
    let { email, password } = req.body;
    if (!(email && password)) { //check if email and password are entered or not
        return res.status(400).json({
            error: "BAD REQUEST",
            message: 'Please enter credentials',
        })
    }
    // check if email is registered or not
    userService.findUserByEmail(email, (err, user) => {
        if (err) {
            if (err.code === 500) {
                return res.status(500).json({
                    message: "INTERNAL SERVER ERROR",
                    description: "An unexpected error occurred on the server",
                    error: err.error
                })
            }
            if (err.code === 404) {
                return res.status(400).json({
                    message: "BAD REQUEST",
                    description: "This email is not registered",
                    error: err.error
                })
            }
            return res.status(500).json(err)
        }
        bcrypt.compare(password, user.password)
            .then(isValid => {
                if (!isValid) {
                    return res.status(401).json({
                        error: "Invalid Credentials"
                    });
                }
                let jwtToken = authService.generateJwtToken({
                    email: user.email,
                    userId: user._id
                });
                return res.status(200).json({
                    message: "User logged in successfully.",
                    jwtToken
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: "INTERNAL SERVER ERROR",
                    description: "An unexpected error occurred on the server",
                    error: err.error
                })
            })
    })
}


export default {
    registerUser,
    loginUser
}