const User = require("../../../DB/model/User")

const deleteByID = async(req, res) => {
    const { id } = req.body
    const found = await User.findOne({ _id: id })
    if (!found) {
        res.status(404).json({ messege: "Sorry But The Email You Are Trying To Delete not Found" })
    } else if (req.user.role == "Admin" || req.user._id == id) {
        try {
            result = await User.deleteOne({ _id: id }).then(e => {
                res.status(200).json({ messege: "Deletd Succefuly" })

            })


        } catch (error) {
            res.status(500).json({
                messege: `Error Happend While Deleting Acount Please Try Again Later`,
                error

            })

        }

    } else {
        res.status(403).json({ messege: "You arn't Auth" })

    }
}

module.exports = { deleteByID }