const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/formModel'); // Ensure this path matches your project structure
const ExamCentre = require('../models/examCentre'); // Ensure this path matches your project structure
const router = express.Router();

// Route for handling form registration
router.post('/register', async (req, res) => {
    console.log("Request body:", req.body); // Debugging line

    try {
        const { name, email, phone, subject, location, examDate } = req.body;

        // Validation: Check if all required fields are present
        if (!name || !email || !phone || !subject || !location || !examDate) {
            return res.status(400).json({
                message: "Missing required fields: name, email, phone, subject, location, and examDate are mandatory.",
            });
        }

        // Check if the exam date is in the future
        if (new Date(examDate) < new Date()) {
            return res.status(400).json({
                message: "The exam date must be in the future.",
            });
        }

        // Check if the exam centre exists and has available seats for the selected date
        const examCentre = await ExamCentre.findOne({ place: location, examDate: new Date(examDate) });
        if (!examCentre) {
            return res.status(404).json({
                message: "Exam centre not found or does not exist for the selected date.",
            });
        }

        if (examCentre.availableSeats <= 0) {
            return res.status(400).json({
                message: "No available seats for the selected exam centre and date.",
            });
        }

        // Create a new Form entity and save it to the database
        const newForm = new Form({
            name,
            email,
            phone,
            subject,
            location,
            examDate: new Date(examDate),
        });

        await newForm.save();

        // Decrease available seats by 1 and save the updated exam centre
        examCentre.availableSeats -= 1;
        await examCentre.save();

        // Return success response
        res.status(201).json({
            message: "Registration successful!",
            availableSeats: examCentre.availableSeats,
        });

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({
            message: "Failed to register",
            error: error.message,
        });
    }
});

module.exports = router;
