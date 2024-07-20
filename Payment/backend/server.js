const express = require('express')
const BodyParser = require('body-parser')
const IyziPay = require('iyzipay')
const Cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
app.use(BodyParser.json())

app.use(Cors())
app.use(express.json())


const iyzipay = new IyziPay({
    apiKey : process.env.IYZICO_API_KEY,
    secretKey : process.env.IYZICO_SECRET_KEY,
    uri : process.env.IYZICO_BASE_URL
})


app.post('/api/payment' , (req,res) => {
    
    const {price , paidPrice , currency , basketId , paymentCard , buyer , shippingAddress , billingAddress , basketItems } = req.body

    const request = {
        locale : IyziPay.LOCALE.TR ,
        conversationId : '123456789' ,
        price : price ,
        paidPrice : paidPrice ,
        currency : currency , 
        installment : '1' , 
        basketId : basketId ,
        paymentChannel : IyziPay.PAYMENT_CHANNEL.WEB ,
        paymentGroup : IyziPay.PAYMENT_GROUP.PRODUCT ,
        paymentCard : paymentCard ,
        buyer : buyer ,
        shippingAddress : shippingAddress ,
        billingAddress : billingAddress ,
        basketItems : basketItems ,
    }

iyzipay.payment.create(request , (err , result) => {

    if(err){

        return res.status(500).json(err)

        }

        res.status(200).json(result)

    })

})



const PORT = process.env.PORT || 3001


app.listen(PORT, () => {

    console.log(`Server Is Running On ${PORT}. port !`)

})