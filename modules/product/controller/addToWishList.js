const Product = require('../../../DB/model/Product')
const User = require('../../../DB/model/User')

const addToWishListCont = async(req, res) => {

    try {
        const { _id } = req.user
        const { productId } = req.body
        const found = await Product.findOne({ _id: productId })
        if (!found) {
            res.status(404).json({ messege: "Sorry But The Product You Are Trying To Add not Found" })
        } else {
            User.updateOne({ _id }, { $addToSet: { "wishList": productId } }).then(e => {
                res.status(200).json({ messege: "Added succefully" })

            })

        }


    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Adding Please Try Again Later`,
            Error: error

        })

    }
}

module.exports = { addToWishListCont }