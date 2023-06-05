
import userDao from "./userDao.js"


async function getUsers(req, res) {
    userDao.getUsers((err, data) => {
        if (err) {
            if (err.code === 500) {
                return res.status(500).json({
                    description: "Internal Server Error",
                    error: err
                })
            } else {
                return res.send(err);
            }
        }
        return res.status(200).json(data)
    });
}


export default {
    getUsers
}