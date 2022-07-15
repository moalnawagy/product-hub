const Comment = require('../../../DB/model/Comment')

const likeAComment = async(req, res) => {
    const { commentId } = req.body
    const { _id } = req.user
    Comment.findById(commentId).then(async(comm) => {
        if (comm) {
            let likedBefore = await Comment.findOne({ _id: commentId, likes: { $in: [_id.toString()] } })
            if (!likedBefore) {
                like = await Comment.updateOne({ _id: commentId }, { $addToSet: { "likes": _id.toString() } })
                res.status(201).json({ message: "like was Aded Succefully" })
            } else {
                dislike = await Comment.updateOne({ _id: commentId }, { $pull: { "likes": _id.toString() } })
                res.status(201).json({ message: "like was deleted Succefully" })
            }
        } else {
            res.status(404).json({ message: "theres no comment to like" })

        }




    }).catch((err) => {
        res.status(500).json({ message: "can't preform the operation" })

    })

}

module.exports = { likeAComment }