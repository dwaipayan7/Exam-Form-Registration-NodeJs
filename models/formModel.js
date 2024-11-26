const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true,
        uniq:true
    },
    phone:{
        type:String,
        require:true
    },
    subject: {
        type: String,
        require: true
    },

    location:{
        type:String,
        required:true
    },
    examDate:{
        type:Date,
        required:true
    }

});



const Form = mongoose.model('Form', formSchema);

module.exports = Form;