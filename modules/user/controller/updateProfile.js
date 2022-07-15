const userModel = require("../../../DB/model/User");
const { sendingEmail } = require("../../../services/sendEmail");

const UpdateProfile = async(req, res) => {
    const { userName, email, age, phone } = req.body
    try {
        if (email == req.user.email) {
            userModel.findOneAndUpdate({ _id: req.user._id }, { userName, age, phone })
        } else {
            userModel.findOneAndUpdate({ _id: req.user._id }, { userName, email, age, phone, confirmEmail: false })
            const token = jwt.sign({ id: req.user._id, email }, process.env.EMAILTOKENSECRET)
            const sending = await sendingEmail(email, 'verification', `<a href="http://${req.get('host')}/confirm/${token}"> confirm </a>`)
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = { UpdateProfile }