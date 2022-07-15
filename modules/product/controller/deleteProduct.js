const Product = require('../../../DB/model/Product')


const DeleteProduct = async(req, res) => {

    try {
        const { _id, role } = req.user
        const { productId } = req.body
        const found = await Product.findById(productId)

        if (!found || _id.toString() != found.createdBy.toString() || role != "Admin") {
            res.status(406).json({ messege: "Sorry you can't do this operation" })
        } else {
            const deleting = await Product.deleteOne({ _id: productId })
            res.status(201).json({ messege: "product has been deleted Succefuly" })

        }

    } catch (error) {
        res.status(500).json({
            messege: `Error Happend `,
            Error: error
        })

    }
}
module.exports = { DeleteProduct }