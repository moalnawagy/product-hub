const userModel = require("../../../DB/model/User");

const block = async(req, res) => {
    try {
        await userModel.updateOne({ _id: req.body.id }, { isBlocked: true })
        res.status(202).json({ message: "this account was blockd succefully" })
    } catch (error) {
        res.status(500).json({ message: "error happened", error })
    }
}
module.exports = { block }