const { validation } = require('../../midlwear/validation')
const {
    signUpValidator,
    loginValidator,
    resetPasswordValidator,
    sendCodeValidator
} = require('./auth.validation')
const confirmEmail = require('./controller/confirmEmail')
const { login } = require('./controller/signin')
const { signup } = require('./controller/signup')
const { resetPassword, sendCode } = require('./controller/forget&resetPassword')
const router = require('express').Router()

router.post('/signup', validation(signUpValidator), signup)
router.post('/signin', validation(loginValidator), login)

router.get('/confirm/:token', confirmEmail)
router.get('/confirmed/:email', (req, res) => {
    res.render('confirm', { email: req.params.email })

})
router.post('/sendResetCode', validation(sendCodeValidator), sendCode)
router.post('/resetPassword', validation(resetPasswordValidator), resetPassword)





module.exports = router