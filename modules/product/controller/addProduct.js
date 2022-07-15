const Product = require('../../../DB/model/Product')
const User = require('../../../DB/model/User')

const { getIo } = require('../../../services/socket');

const QRCode = require('qrcode')


const addProduct = async(req, res) => {
    const { productTitle, productDesc, price } = req.body
    const createdBy = req.user._id
    let code;
    const found = await Product.findOne({ productTitle, productDesc, price, createdBy })
    if (found) {
        res.status(406).json({ messege: "Sorry But The product is already added before" })
    } else {
        try {
            QRCode.toDataURL(`${JSON.stringify({ productTitle, productDesc, price, createdBy })}`, async function(err, url) {
                if (err) {
                    res.status(500).json({
                        messege: `Error Happend`,
                        Error: err
                    })
                } else {
                    code = url
                    const addingProduct = await Product.insertMany({ productTitle, productDesc, QrCode: code, price, createdBy })
                    const addingToUser = await User.updateOne({ _id: createdBy }, { $addToSet: { "Products": addingProduct[0]._id.toString() } })
                    getIo().to('Auth').emit("product", { data: JSON.stringify(addingProduct[0]) })
                    res.status(201).json({ messege: "product has been Added Succefuly", product: addingProduct })
                }
            })


        } catch (error) {
            console.log(error);
            res.status(500).json({
                messege: `Error Happend`,
                Error: error
            })

        }

    }
}


module.exports = { addProduct }