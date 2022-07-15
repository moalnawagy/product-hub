const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);


const addProductValidator = {
    body: Joi.object().required().keys({

        productTitle: Joi.string().required(),
        productDesc: Joi.string().required(),
        price: Joi.number().required(),

    })
}


const addToWishListValidator = {
    body: Joi.object().required().keys({
        productId: Joi.objectId().required(),

    })
}

const DeleteProductValidator = {
    body: Joi.object().required().keys({
        productId: Joi.objectId().required(),

    })
}
const likeAproductValidator = {
    body: Joi.object().required().keys({
        productId: Joi.objectId().required(),

    })
}

const softDeleteProductValidator = {
    body: Joi.object().required().keys({
        productId: Joi.objectId().required(),

    })
}

const updateProductValidator = {
    body: Joi.object().required().keys({
        productId: Joi.objectId().required(),

        productTitle: Joi.string().required(),
        productDesc: Joi.string().required(),
        price: Joi.number().required(),

    })
}


module.exports = {
    addProductValidator,
    addToWishListValidator,
    DeleteProductValidator,
    likeAproductValidator,
    softDeleteProductValidator,
    updateProductValidator
}