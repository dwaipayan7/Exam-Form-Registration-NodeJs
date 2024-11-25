const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    examCourse: {
        type: String,
        required: true,
        unique: true,
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;