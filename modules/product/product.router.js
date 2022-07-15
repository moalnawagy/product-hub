const { auth } = require('../../midlwear/auth')
const endPoint = require('./product.endPoint')
const router = require('express').Router()
const { addProduct } = require('./controller/addProduct')
const { updateProduct } = require('./controller/updateProduct')
const { DeleteProduct } = require('./controller/deleteProduct')
const { softDeleteProduct } = require('./controller/softDeleteProduct')
const { likeAproduct } = require('./controller/Like&unlike')
const { addToWishListCont } = require('./controller/addToWishList')
const { validation } = require('../../midlwear/validation')
const {
    addProductValidator,
    addToWishListValidator,
    DeleteProductValidator,
    likeAproductValidator,
    softDeleteProductValidator,
    updateProductValidator

} = require('./product.validation')

router.post('/addProduct', validation(addProductValidator), auth(endPoint.addProduct), addProduct)
router.put('/updateProduct', validation(updateProductValidator), auth(endPoint.updte), updateProduct)
router.delete('/deleteProduct', validation(DeleteProductValidator), auth(endPoint.delete), DeleteProduct)
router.put('/softDeleteProd', validation(softDeleteProductValidator), auth(endPoint.softDeletePoint), softDeleteProduct)
router.put('/like&unlike', validation(likeAproductValidator), auth(endPoint.like), likeAproduct)
router.put('/addToWishList', validation(addToWishListValidator), auth(endPoint.addToWishList), addToWishListCont)




module.exports = router