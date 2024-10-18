const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const formRouter = require('./routes/formRouter'); 
const { config } = require('dotenv');
config()

const app = express();

connectDB();

const PORT = process.env.PORT || 3000; 


app.use(bodyParser.json());


app.use('/', formRouter);


app.listen(PORT, () => {
    console.log(`Running in Server: ${PORT}`);
});
