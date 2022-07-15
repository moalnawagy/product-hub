const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    QrCode: {
        type: String,
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    hidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],





}, {
    timestamps: true
})

productSchema.pre("findOneAndUpdate", async function() {

    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    this.set({ __v: hookData.__v + 1 })
})


const productModel = mongoose.model('Product', productSchema)
module.exports = productModel