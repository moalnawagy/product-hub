const jwt = require("jsonwebtoken");
const userModel = require("../../../DB/model/User");

const confirmEmail = async(req, res) => {
    const { token } = req.params
    try {
        const decoded = await jwt.verify(token, process.env.EMAILTOKENSECRET)
        userModel.updateOne({ _id: decoded.id }, { confirmEmail: true }, { new: true }).then((r) => {
            res.redirect(`/confirmed/${decoded.email}`)
        })
    } catch (error) {
        res.status(500).json({ error })


    }



}


module.exports = confirmEmail