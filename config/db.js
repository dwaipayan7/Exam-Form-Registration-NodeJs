const mongoose = require('mongoose');

const connectDB = async() =>{

    try {
        const connection = await mongoose.connect('mongodb+srv://biswastatay73:c2EmuveE5sLVQjAA@cluster0.wzhbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Connected Successfully ${connection.connection.host}`)
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;