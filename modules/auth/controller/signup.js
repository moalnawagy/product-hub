const userModel = require("../../../DB/model/User");


const {
    StatusCodes,
} = require('http-status-codes');

const jwt = require("jsonwebtoken");
const { sendingEmail } = require("../../../services/sendEmail");
const signup = async(req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const find = await userModel.findOne({ email })
        if (!find) {
            const newUser = new userModel({ firstName, lastName, email, password });
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.EMAILTOKENSECRET)
            const sending = await sendingEmail(email, 'verification', `<a href="http://${req.get('host')}/confirm/${token}"> confirm </a>`)
            res.status(201).json({ message: "Done" })
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "email already exist" })

        }

    } catch (error) {
        console.log(error);
        if (error.keyValue) {
            if (error.keyValue.email) {
                res.status(StatusCodes.FORBIDDEN).json({ message: "email already exist" })
            }
        } else {
            res.json({ message: "catch err ", error })
        }

    }

}
module.exports = { signup }