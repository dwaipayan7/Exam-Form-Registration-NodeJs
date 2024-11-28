const mongoose = require("mongoose");
const ExamCentre = require("./models/examCentre");
const { config } = require("dotenv");
config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    // Define four places with future dates within the next two months (15 days apart)
    const examCentres = [
      {
        place: "Kolkata",
        examDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
        examTime: new Date().setHours(14, 30, 0, 0),
        availableSeats: 30,
      },
      {
        place: "Kalyani",
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
        examTime: new Date().setHours(9, 0, 0, 0), 
        availableSeats: 12,
      },
      {
        place: "Krishnanagar",
        examDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        examTime: new Date().setHours(16, 0, 0, 0), 
        availableSeats: 24,
      },
      {
        place: "Howrah",
        examDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        examTime: new Date().setHours(11, 0, 0, 0), 
        availableSeats: 10,
      },
    ];

    return ExamCentre.insertMany(examCentres);
  })
  .then(() => {
    console.log("Data successfully inserted");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
