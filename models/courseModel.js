const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        unique: true,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
