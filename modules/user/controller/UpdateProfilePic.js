const User = require("../../../DB/model/User")
const updateProfPic = async(req, res) => {

    try {
        if (req.fileErr) {
            res.json({ message: "in-valid file format" })
        } else {
            const path = `${req.finalDistination}/${req.file.filename}`
            const user = await User.updateOne({ _id: req.user._id.toString() }, { $addToSet: { "proflePic": path } });
            res.json({ message: "pic was updated succefully" })
        }

    } catch (error) {
        res.json({ message: "catch error", error })
    }
}
module.exports = { updateProfPic }