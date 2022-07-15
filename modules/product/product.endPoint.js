const { Roles } = require("../../midlwear/auth");


const endPoint = {
    addProduct: [Roles.Admin, Roles.User],
    updte: [Roles.Admin, Roles.User],
    delete: [Roles.Admin, Roles.User],
    softDeletePoint: [Roles.Admin, Roles.User],
    like: [Roles.Admin, Roles.User],
    addToWishList: [Roles.Admin, Roles.User],


}

module.exports = endPoint