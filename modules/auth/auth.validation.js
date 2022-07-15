const Joi = require('joi');



const signUpValidator = {
    body: Joi.object().required().keys({

        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required()
    })
}


const loginValidator = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),

    })
}

const sendCodeValidator = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),

    })
}
const resetPasswordValidator = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        code: Joi.number().integer().greater(-1).less(10000).required(),
        newPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),

    })
}


module.exports = {
    signUpValidator,
    loginValidator,
    sendCodeValidator,
    resetPasswordValidator
}