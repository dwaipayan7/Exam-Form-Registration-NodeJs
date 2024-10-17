const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const formRouter = require('./routes/formRouter'); 

const app = express();

connectDB();

const port = 3000;


app.use(bodyParser.json());


app.use('/', formRouter);


app.listen(port, () => {
    console.log(`Running in Server: ${port}`);
});
