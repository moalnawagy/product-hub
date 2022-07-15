const jwt = require('jsonwebtoken');
const userModel = require('../DB/model/User');
const Roles = {

    Admin: "Admin",
    User: "User",
}
const auth = (accessRoles) => {
    return async(req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            if (!headerToken ||
                headerToken == null ||
                headerToken == undefined ||
                !headerToken.startsWith(`${process.env.Bearerkey} `)) {
                res.json({ message: "header token error" })
            } else {
                const token = headerToken.split(" ")[1];
                if (!token ||
                    token == null ||
                    token == undefined || token.length < 1) {
                    res.json({ message: "in-valid token " })

                } else {

                    const decoded = jwt.verify(token, process.env.tokenSignature);
                    const findUser = await userModel.findById(decoded.id).select('name  email role phone')
                    if (!findUser) {
                        res.json({ message: "in-valid loggin user " })
                    } else {

                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser

                            next()
                        } else {
                            res.status(401).json({ message: "not auth user" })
                        }

                    }

                }

            }
        } catch (error) {
            res.json({ message: "token catch error", error })

        }

    }
}

module.exports = {
    auth,
    Roles
}