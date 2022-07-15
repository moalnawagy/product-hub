const { auth } = require('../../midlwear/auth')
const { deleteByID } = require('./controller/delete')
const { block } = require('./controller/block')
const { deactivate } = require('./controller/deactivateAccount')
const { sendMultiple } = require('./controller/sendForMultipleUser')
const { UpdateProfile } = require('./controller/updateProfile')
const { myMulter, multerValidators, multerPath } = require('../../services/multer/multer')
const endPoint = require('./user.endPoint')
const router = require('express').Router()
const { updateProfPic } = require("./controller/UpdateProfilePic")
const { updateCovPic } = require("./controller/UpdateCovPic")
const { softDelete } = require('./controller/softDeleteUser')
const { getAllUsers } = require('./controller/getAllUsers')
const { validation } = require('../../midlwear/validation')
const { deleteByIDValidator, softDeleteValidator } = require('./user.validation')

router.put('/deactivateAccount', auth(endPoint.deactivate), deactivate)
router.put('/block', auth(endPoint.block), block)
router.delete('/deleteUser', validation(deleteByIDValidator), auth(endPoint.delete), deleteByID)

router.post("/sendMul", auth(endPoint.sendMul), sendMultiple)
router.patch('/update', auth(endPoint.update), UpdateProfile)

router.patch("/updateProfilePic", auth(endPoint.update), myMulter(multerPath.avatarPic, multerValidators.image).single('image'), updateProfPic)

router.patch("/updateCovPic", auth(endPoint.update), myMulter(multerPath.covPic, multerValidators.image).single('image'), updateCovPic)
router.patch("/softDeleteUser", validation(softDeleteValidator), auth(endPoint.softDelete), softDelete)

router.get("/getAllUsers", auth(endPoint.getAllUsers), getAllUsers)



module.exports = router