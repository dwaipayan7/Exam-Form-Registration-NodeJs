const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    phone: {
        type: String,
        required: true,
        unique: true  
    },
    subject: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    examDate: {
        type: Date,
        required: true
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
