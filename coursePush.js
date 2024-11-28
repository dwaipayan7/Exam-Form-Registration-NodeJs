require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Course = require('./models/courseModel'); // Adjust path if needed

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URL; // Ensure this matches your .env file

if (!MONGO_URI) {
  console.error('Error: MONGO_URL environment variable is not defined.');
  process.exit(1);
}

// Predefined computer-related subjects to add
const subjects = [
  { subject: 'Computer Programming' },
  { subject: 'Data Structures and Algorithms' },
  { subject: 'Database Management Systems' },
  { subject: 'Operating Systems' },
  { subject: 'Computer Networks' },
  { subject: 'Software Engineering' },
  { subject: 'Web Development' },
  { subject: 'Artificial Intelligence' },
  { subject: 'Machine Learning' },
  { subject: 'Computer Graphics' },
];

// Connect to MongoDB and insert subjects
const pushSubjects = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Insert subjects into the Course collection
    const result = await Course.insertMany(subjects, { ordered: false });
    console.log('Computer-related subjects added successfully:', result);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    if (error.code === 11000) {
      console.error('Some subjects already exist in the database.');
    } else {
      console.error('Error adding subjects:', error.message);
    }

    // Close the connection in case of error
    await mongoose.connection.close();
  }
};

// Run the script
pushSubjects();
