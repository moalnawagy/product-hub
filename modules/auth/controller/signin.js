const userModel = require("../../../DB/model/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            res.json({ message: "in-valid email or password" })
        } else if (user.isBlocked) {
            res.status(403).json({ message: "sorry you are blocked by the admin" })
        } else {

            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.tokenSignature)
                if (!user.activeAccount) {
                    await userModel.findOneAndUpdate({ email }, { activeAccount: true })
                    res.json({ message: "Hello Again", token })
                } else if (user.isDeleted) {
                    res.status(403).json({ message: "Your account has been deleted by the admin" })
                } else if (!user.confirmEmail) {
                    res.status(403).json({ message: "please confirm your email first" })
                } else {
                    res.json({ message: "Hello", token })
                }
            } else {
                res.json({ message: "in-valid email or password" })
            }
        }
    } catch (error) {

        res.json({ message: "catch error", error })

    }

}
module.exports = { login }