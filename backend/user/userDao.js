import User from "../models/User.js";
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

async function findUserByEmail(email, done) {
    User.findOne({ email })
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

async function findUserById(id, done) {
    try {

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}


export default {
    getUsers,
    createUser,
    findUserByEmail,
    findUserById
}