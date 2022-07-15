const { auth } = require('../../midlwear/auth')
const endPoint = require('./comment.endPoint')
const router = require('express').Router()
const { addComment } = require('./controller/addComment')
const { deleteComment } = require('./controller/deleteComment')
const { likeAComment } = require('./controller/Like&unlike')
const { updateComment } = require('./controller/updateComment')
const { validation } = require('../../midlwear/validation')
const {
    addCommentValidator,
    deleteCommentValidator,
    likeACommentValidator,
    updateCommentValidator
} = require('./comment.validation')

router.post('/addComment', validation(addCommentValidator), auth(endPoint.addCommnt), addComment)
router.patch('/updateComment', validation(updateCommentValidator), auth(endPoint.update), updateComment)
router.delete('/deleteComment', validation(deleteCommentValidator), auth(endPoint.delete), deleteComment)
router.put('/likeComment', validation(likeACommentValidator), auth(endPoint.like), likeAComment)






module.exports = router