const { config } = require('dotenv');
const mongoose = require('mongoose');
config()

const connectDB = async() =>{

    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log(`Connected to MongoDB`)
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDB; 