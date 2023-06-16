import User from "../models/User.js";


// get all the registered users
async function getUsers(done) {
    User.find()
        .then(data => {
            done(null, data);
        })
        .catch(err => {
            done({
                code: 500,
                error: err
            })
        })
}
// to create new user in the database
async function createUser({ name, email, password }, done) {
    let newUser = new User({
        name,
        email,
        password
    })
    newUser.save()
        .then(savedUser => {
            done(null, savedUser)
        })
        .catch(err => {
            done({
                code: 500,
                error: err
            })
        })

}

// to find a user by email
async function findUserByEmail(email, done) {
    User.findOne({ email: email.toLowerCase() })
        .then(data => {
            done(null, data);
        })
        .catch(error => {
            done({
                code: 500,
                error: error
            })
        })
}

// to update user details
async function updateUser(userId, userDetails, done) {
    User.findByIdAndUpdate(userId, userDetails, { new: true })
        .then(data => {
            done(null, data)
        })
        .catch(err => {
            done({
                code: 500,
                error: err
            })
        })
}



export default {
    getUsers,
    createUser,
    findUserByEmail,
    updateUser
}