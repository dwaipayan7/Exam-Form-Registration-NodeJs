const express = require('express');
const mongoose = require('mongoose');
const ExamCentre = require('../models/examCentreSchema'); 

const router = express.Router();

// Sample data for exam centers
const demoExamCentres = [
    { place: "Howrah", examDate: new Date('2024-12-15') },
    { place: "Bethuadahari", examDate: new Date('2024-12-25') },
    { place: "Kalyani", examDate: new Date('2025-01-10') },
    { place: "Krishnanagar", examDate: new Date('2025-01-20') },
];

// Function to push data into MongoDB
router.post('/addExamCentres', async (req, res) => {
    try {
        const insertedCentres = await ExamCentre.insertMany(demoExamCentres);
        res.status(200).json({ message: 'Exam centres added successfully', data: insertedCentres });
    } catch (error) {
        console.error('Error inserting exam centres:', error);
        res.status(500).json({ error: 'Failed to add exam centres' });
    }
});

module.exports = router;
