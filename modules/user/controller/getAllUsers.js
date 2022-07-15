const User = require('../../../DB/model/User')
const getAllUsers = async(req, res) => {
    try {
        const limit = 5
        const count = await User.find().count()
        let page = req.query.page
        if (page == undefined || page <= 0 || page > Math.floor(count / limit)) {
            page = 1
        }

        let Skip = (page - 1) * limit;
        if (count) {
            const find = await User.find().select(' -password').populate({
                path: "Products",
                populate: {
                    path: 'comments',
                    populate: {
                        path: 'likes',
                        select: "_id firstName"

                    }
                }

            }).skip(Skip).limit(limit)
            res.status(200).json(find)

        } else {
            res.status(404).json({ messege: "There Is No Accounts" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messege: `Error Happend While Finding Acount Please Try Again Later`,
            Error: error
        })
    }
}
module.exports = { getAllUsers }