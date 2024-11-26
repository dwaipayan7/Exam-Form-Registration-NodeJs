const mongoose = require('mongoose')

const examCentreSchema = new mongoose.Schema({

    place:{
        type:String,
        required:true
    },
    examDate:{
        type:Date,
        required:true
    },
    availableSeats: {
        type: Number,
        required: true,
        default: 10
    },


});

module.exports = mongoose.model("ExamCentre", examCentreSchema);