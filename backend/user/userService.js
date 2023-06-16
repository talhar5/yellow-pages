import userDao from "./userDao.js";

function createUser(userDetails, done) {
    userDao.createUser(userDetails, (err, result) => {
        if (err) return done({ code: 500, error: err });
        return done(null, result);
    });
}

function findUserByEmail(email, done) {
    userDao.findUserByEmail(email, (err, user) => {
        if (err) return done({ error: err.error, code: 500 });
        if (user) {
            return done(null, user);
        }
        return done({
            error: "User not found",
            code: 404
        })
    });

}

function findUserById(id, done) {
    userDao.findUserById(id, (err, user) => {
        if (err) return done({ error: err, code: 500 });
        if (user) {
            return done(null, user);
        }
        return done({
            error: "User not found",
            code: 404
        })
    });

}

function saveOtp(userId, otp, done) {
    userDao.updateUser(userId, { otp: otp, isVerified: false }, (err, data) => {
        if (err) return done(err);
        done(null, data);
    })
}

function updateUser(userId, userDetails, done) {
    userDao.updateUser(userId, userDetails, done);
}


export default {
    createUser,
    findUserByEmail,
    findUserById,
    saveOtp,
    updateUser
}