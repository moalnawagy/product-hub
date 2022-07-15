const Comment = require('../../../DB/model/Comment')

const updateComment = async(req, res) => {
    try {
        const { _id } = req.user
        const { commentId, text } = req.body
        const found = await Comment.findOne({ _id: commentId })
        if (!found) {
            res.status(404).json({ messege: "Sorry But The comment You Are Trying To update on is not Found" })
        } else {
            Comment.updateOne({ _id: commentId }, { text }).then(e => {
                res.status(200).json({ messege: "updated succefully" })

            })

        }


    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While updating Please Try Again Later`,
            Error: error

        })

    }
}

module.exports = { updateComment }