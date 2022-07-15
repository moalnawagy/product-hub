const userModel = require("../../../DB/model/User");

const deactivate = async(req, res) => {
    try {
        await userModel.updateOne({ _id: req.user._id }, { activeAccount: false })
        res.status(202).json({ message: "your account was deactivated succefully" })
    } catch (error) {
        res.status(500).json({ message: "error happened", error })
    }
}
module.exports = { deactivate }