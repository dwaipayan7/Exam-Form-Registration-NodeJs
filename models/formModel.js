const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    examCourse: {
        type: String,
        require: true
    },
    dob:{
        type: Date,
        require:true
    },
    registrationDate:{
        type:Date,
        default: Date.now
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;