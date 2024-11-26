const mongoose = require('mongoose');
const ExamCentre = require('./models/examCentre');
const { config } = require('dotenv');
config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Define four places with future dates within the next two months
        const examCentres = [
            { place: 'Kolkata', examDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }, // 15 days later
            { place: 'Kalyani', examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days later
            { place: 'Krishnanagar', examDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) }, // 45 days later
            { place: 'Howrah', examDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) }, // 60 days later
        ];

        return ExamCentre.insertMany(examCentres);
    })
    .then(() => {
        console.log('Data successfully inserted');
    })
    .catch((error) => {
        console.error('Error inserting data:', error);
    })
    .finally(() => {
        mongoose.connection.close();
    });