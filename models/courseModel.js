const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    selectedCourse: {
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
