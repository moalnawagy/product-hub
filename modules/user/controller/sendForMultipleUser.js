const { sendingEmail } = require("../../../services/sendEmail")




const sendMultiple = async(req, res) => {
    const { users, content, subject, attach, attachName } = req.body
        //users is a list of emails and admin can also send attachments 
    try {
        await sendingEmail(users, subject, content, attach, attachName)
        res.status(201).json({ message: "Done" })
    } catch (error) {
        res.status(500).json({ message: "error", error })

    }
}
module.exports = { sendMultiple }