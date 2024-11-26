const mongoose = require('mongoose')

const examCentreSchema = new mongoose.Schema({

    place:{
        type:String,
        required:true
    },
    examDate:{
        type:Date,
        required:true
    }

});

module.exports = mongoose.model("ExamCentre", examCentreSchema);