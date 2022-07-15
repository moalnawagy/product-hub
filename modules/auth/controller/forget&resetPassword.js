const userModel = require("../../../DB/model/User");
const { sendingEmail } = require("../../../services/sendEmail");
const bcrypt = require("bcrypt")
const sendCode = async(req, res) => {

    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404).json({ message: "in-valid account" })
    } else {
        const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
        message = `<p> use this code to update u password  : ${code} </p>`
        await userModel.findByIdAndUpdate(user._id, { code })
        sendingEmail(email, "Reset Your password now", message)
        res.status(200).json({ message: "Done" })
    }
}


const resetPassword = async(req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "in-valid account" })
        } else {
            if (user.code.toString() != code.toString()) {
                res.status(409).json({ message: "wrong code" })
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))

                await userModel.findByIdAndUpdate(user._id, { password: hashedPassword, code: "" })

                res.status(200).json({ message: "Done plz go login" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'catch error ', error })

    }

}
module.exports = { sendCode, resetPassword }