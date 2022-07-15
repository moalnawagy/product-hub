const express = require('express');
const { connectDB, reddisClient } = require('./DB/connection');
const path = require('path')
const { sendingEmail } = require("./services/sendEmail");
const jwt = require('jsonwebtoken')

const {
    userRouter,
    authRouter,
    productRouter,
    commentRouter
} = require('./modules/index.router');
const { createInvoice } = require('./services/pdf');
const app = express();
require('dotenv').config()
app.use(express.json())
app.set('view engine', 'ejs');
app.use(authRouter, userRouter, productRouter, commentRouter)
const cors = require('cors');
const schedule = require('node-schedule');
app.use(cors());
app.get('/', (req, res) => {
    res.json({ "message": "hello" })
})
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('./DB/model/User');
const Product = require('./DB/model/Product')
const { initIO } = require('./services/socket');
const port = process.env.PORT
schedule.scheduleJob('1 59 23 * * *', async() => {
    // I changed sec to 1 instead of 59 beacuase of 
    //conflict if connection with DB was slow then
    // date of today will be the date of new date

    const todayDate = new Date()
    const yestedayDate = new Date();
    yestedayDate.setDate(todayDate.getDate() - 1)

    const todayProducts = await Product.find({ createdAt: { "$gt": yestedayDate.toISOString() } })
    createInvoice(todayProducts, path.join(__dirname, './ProductReport.pdf'));
    sendingEmail("nawagymohamed@gmail.com", "Today Report", "Hello sir this is today report of products that was added today", path.join(__dirname, './ProductReport.pdf'), "Today Report")

});




connectDB()
reddisClient.connect()
const server = app.listen(port, () => {
    console.log(`running on port.....${port}`);
})
const io = initIO(server)

io.on('connection', async(socket) => {

    socket.on("Auth", async(token) => {
        try {
            const decoded = jwt.verify(token, process.env.tokenSignature);
            const find = await userModel.findById(decoded.id)
            if (find) {
                await reddisClient.setEx(decoded.id, 3600, socket.id)
                socket.join("Auth")
                io.to("Auth").emit("back", "new one enterd")
            } else {
                socket.emit("back", "you arn't auth")

            }

        } catch (error) {
            socket.emit("back", "you arn't auth")

        }

    })

});