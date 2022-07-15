const Product = require('../../../DB/model/Product')

const likeAproduct = async(req, res) => {
    const { productId } = req.body
    const { _id } = req.user
    Product.findById(productId).then(async(product) => {

        let likedBefore = await Product.findOne({ _id: productId, likes: { $in: [_id.toString()] } })
        if (!likedBefore) {
            like = await Product.updateOne({ _id: productId }, { $addToSet: { "likes": _id.toString() } })
            res.status(201).json({ message: "like was Aded Succefully" })
        } else {
            dislike = await Product.updateOne({ _id: productId }, { $pull: { "likes": _id.toString() } })
            res.status(201).json({ message: "like was deleted Succefully" })
        }

    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation" })

    })

}

module.exports = { likeAproduct }