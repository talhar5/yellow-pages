import userService from "../user/userService.js";
import authService from "./authService.js";
import bcrypt from 'bcrypt';



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
                let otp = authService.generateOtp();
                userService.saveOtp(result._id, otp, (err, updatedUser) => {
                    if (err) {
                        return res.status(500).json({
                            description: "Internal server error",
                            error: err.error,
                        })
                    }
                    authService.sendOtpEmail(updatedUser.email, otp, (err, data) => {
                        if (err) {
                            return res.status(500).json({
                                description: "Internal server error",
                                error: err.error,
                            })
                        }
                        return res.status(201).json({
                            description: "user has been registered successfully"
                        })
                    })
                })

            })
        }
    })
}

async function verifyOtp(req, res) {
    let { email, otp } = req.body
    if (!email) {
        return res.status(403).json({
            message: "Error occurred"
        })
    }
    userService.findUserByEmail(email, (err, user) => {
        if (err) {
            if (err.code === 404) {
                return res.status(404).json({
                    description: "User not found",
                    error: err.error,
                })
            }
            return res.status(500).json({
                description: "Internal server error",
                error: err.error,
            })
        }
        if (user.otp === otp) {
            userService.updateUser(user._id, { otp: '', isVerified: true }, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        description: "Internal server error",
                        error: err.error,
                    })
                }
                return res.status(200).json({
                    message: "Email is verified successfully."
                })
            })
        } else {
            return res.status(400).json({
                message: "Incorrect OTP"
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
                    jwtToken,
                    userDetails: {
                        email: user.email,
                        userId: user._id
                    }
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

function resetPassword(req, res) {
    let { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    userService.findUserByEmail(email, (err, result) => {
        if (err) {
            if (err.code === 404) {
                return res.status(404).json({
                    message: "Email is not registered"
                })
            }
            if (err.code === 500) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }
        }
        let otp = authService.generateOtp();
        userService.updateUser(result._id, { otp }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }
            authService.sendOtpEmail(result.email, result.otp, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Internal Server Error"
                    })
                }
                return res.status(200).json({
                    message: "OTP has been sent to your email"
                })
            })
        })
    })
}

async function createPassword(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        })
    }
    userService.findUserByEmail(email, async (err, result) => {
        if (err) {
            if (err.code === 404) {
                return res.status(404).json({
                    message: "Email is not registered"
                })
            }
            if (err.code === 500) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }
        }
        if (!result.isVerified) {
            return res.status(425).json({
                message: "Please verify your email first"
            })
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        userService.updateUser(result._id, { password: hashedPassword, isVerified: false }, (err, result) => {
            if (err) {

                if (err.code === 500) {
                    return res.status(500).json({
                        message: "Internal Server Error"
                    })
                }
            }
            return res.status(200).json({
                message: "Password has been reset successfully"
            })
        })
    })
}

export default {
    registerUser,
    loginUser,
    verifyOtp,
    resetPassword,
    createPassword
}