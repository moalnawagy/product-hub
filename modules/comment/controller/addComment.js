const Comment = require('../../../DB/model/Comment')
const Product = require('../../../DB/model/Product')
const { getIo } = require('../../../services/socket');

const addComment = async(req, res) => {

    try {
        const { _id } = req.user
        const { productId, text } = req.body
        const found = await Product.findOne({ _id: productId })
        if (!found) {
            res.status(404).json({ messege: "Sorry But The comment You Are Trying To add not Found" })
        } else {
            Comment.insertMany({ productId, text, createdBy: _id.toString() }).then(e => {
                getIo().to('Auth').emit("comment", { comment: JSON.stringify(e[0]) })
                Product.updateOne({ _id: productId }, { $addToSet: { "comments": e[0]._id.toString() } }).then(r => {
                    console.log(r);
                    res.status(200).json({ messege: "Added succefully" })

                })

            })

        }


    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While Adding Please Try Again Later`,
            Error: error

        })

    }
}

module.exports = { addComment }