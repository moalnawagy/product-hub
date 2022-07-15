const Product = require('../../../DB/model/Product')



const updateProduct = async(req, res) => {
    const { _id } = req.user
    const { productId, productTitle, productDesc, price } = req.body
    const found = await Product.findById(productId)
    if (!found || _id != found.createdBy.toString()) {
        res.status(406).json({ messege: "Sorry you can't do this operation" })
    } else {
        try {
            const Updatinf = await Product.updateOne({ _id: productId }, { productTitle, productDesc, price })
            res.status(201).json({ messege: "product has been Updated Succefuly" })
        } catch (error) {
            res.status(500).json({
                messege: `Error Happend `,
                Error: error
            })

        }

    }

}

module.exports = { updateProduct }