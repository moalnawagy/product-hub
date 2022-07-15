const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



const addCommentValidator = {
    body: Joi.object().required().keys({

        productId: Joi.objectId().required(),
        text: Joi.string().min(3).max(200).required(),
    })
}


const deleteCommentValidator = {
    body: Joi.object().required().keys({
        commentId: Joi.objectId().required(),

    })
}

const likeACommentValidator = {
    body: Joi.object().required().keys({
        commentId: Joi.objectId().required(),

    })
}
const updateCommentValidator = {
    body: Joi.object().required().keys({

        commentId: Joi.objectId().required(),
        text: Joi.string().min(3).max(200).required(),
    })

}


module.exports = {
    addCommentValidator,
    deleteCommentValidator,
    likeACommentValidator,
    updateCommentValidator

}