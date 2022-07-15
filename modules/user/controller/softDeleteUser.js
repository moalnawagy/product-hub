const User = require('../../../DB/model/User')

const softDelete = async(req, res) => {
    const { userId } = req.body
    const found = await User.findById(userId)
    if (!found) {
        res.status(404).json({ messege: "Sorry But The User You Are Trying To Delete not Found" })
    } else {
        try {
            User.updateOne({ _id: userId }, { isDeleted: true }).then(e => {
                res.status(200).json({ messege: "Soft Deletd Succefuly" })

            })

        } catch (error) {
            res.status(500).json({
                messege: `Error Happend While Deleting Acount Please Try Again Later`,
                Error: err

            })

        }

    }
}

module.exports = { softDelete }