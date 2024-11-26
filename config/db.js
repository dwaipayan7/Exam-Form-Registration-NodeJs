const { config } = require('dotenv');
const mongoose = require('mongoose');
config()

const connectDB = async() =>{

//process.env.MONGO_URL

    try {
         await mongoose.connect("mongodb://localhost:27017/Testing");
         console.log(`Connected to MongoDB`)
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDB; 