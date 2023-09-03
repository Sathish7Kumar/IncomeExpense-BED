const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')


const transactions = require('./routes/transaction');

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send("Hello Backend App ")
})

app.use('/api/v1/transactions', transactions)


app.listen(PORT,()=>{
    console.log(`Server running Sucessfully : Port ${PORT}`.yellow.bold)
})

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true, useUnifiedTopology: true
            });
            console.log('DB Connected Susessfully'.red.underline.bgWhite.bold)
    } catch (error) {
       console.log(`Error :  ${error.message}`) 
    }
}
dbConnect()




