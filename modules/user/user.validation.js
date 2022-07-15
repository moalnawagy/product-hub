const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);


const deleteByIDValidator = {
    body: Joi.object().required().keys({

        id: Joi.objectId().required(),

    })
}




const softDeleteValidator = {
    body: Joi.object().required().keys({
        userId: Joi.objectId().required(),

    })
}


module.exports = {
    deleteByIDValidator,
    softDeleteValidator
}