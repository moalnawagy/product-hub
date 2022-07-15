const { Roles } = require("../../midlwear/auth");


const endPoint = {
    deactivate: [Roles.Admin, Roles.User],
    block: [Roles.Admin],
    delete: [Roles.Admin, Roles.User],
    sendMul: [Roles.Admin],
    update: [Roles.Admin, Roles.User],
    softDelete: [Roles.Admin],
    getAllUsers: [Roles.Admin]
}

module.exports = endPoint