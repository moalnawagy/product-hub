const Comment = require('../../../DB/model/Comment')

const deleteComment = async(req, res) => {
    try {
        const { _id, role } = req.user
        const { commentId } = req.body
        const found = await Comment.findOne({ _id: commentId })
        if (!found || _id.toString() != found.createdBy || role != "Admin") {
            res.status(404).json({ messege: "Sorry can't do this" })
        } else {
            Comment.deleteOne({ _id: commentId }).then(e => {
                res.status(200).json({ messege: "deleted succefully" })

            })

        }


    } catch (error) {
        res.status(500).json({
            messege: `Error Happend While deleting Please Try Again Later`,
            Error: error

        })

    }
}

module.exports = { deleteComment }