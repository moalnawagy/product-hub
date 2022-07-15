const mongoose = require('mongoose')
const bycrpt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    proflePic: [{ type: String }],
    CovlePic: [{ type: String }],
    Products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],

    phone: String,

    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'User' },
    activeAccount: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    code: String,
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]

}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    this.password = await bycrpt.hash(this.password, parseInt(process.env.saltRound))
    next()
})
userSchema.pre("findOneAndUpdate", async function() {

    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    this.set({ __v: hookData.__v + 1 })
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel