const { Roles } = require("../../midlwear/auth");


const endPoint = {
    addCommnt: [Roles.Admin, Roles.User],
    update: [Roles.Admin, Roles.User],
    delete: [Roles.Admin, Roles.User],
    like: [Roles.Admin, Roles.User],


}

module.exports = endPoint