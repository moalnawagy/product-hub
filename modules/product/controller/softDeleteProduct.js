const Product = require('../../../DB/model/Product')

const softDeleteProduct = async(req, res) => {

    try {
        const { _id, role } = req.user
        const { productId } = req.body
        const found = await Product.findOne({ _id: productId })
        if (!found || _id.toString() != found.createdBy.toString() || role != "Admin") {
            res.status(404).json({ messege: "Sorry But The Email You Are Trying To Delete not Found" })
        } else {
            Product.updateOne({ _id: productId }, { isDeleted: true }).then(e => {
                res.status(200).json({ messege: "Soft Deletd Succefuly" })

            })

        }


    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Deleting Acount Please Try Again Later`,
            Error: error

        })

    }
}

module.exports = { softDeleteProduct }