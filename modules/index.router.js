const userRouter = require('./user/user.router')
const authRouter = require('./auth/auth.router')
const productRouter = require('./product/product.router')
const commentRouter = require('./comment/comment.router')

module.exports = {
    userRouter,
    authRouter,
    productRouter,
    commentRouter
}