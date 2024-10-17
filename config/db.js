const mongoose = require('mongoose');

const connectDB = async() =>{

    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/examRegistration')
        console.log(`Connected Successfully ${connection.connection.host}`)
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;