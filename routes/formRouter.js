const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/formModel');
const Course = require('../models/courseModel');
const ExamCentre = require('../models/examCentre');
const router = express.Router();

// Route for handling form registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, subject, location, examDate } = req.body;

        // Validation: Check if all required fields are present
        if (!name || !email || !phone || !subject || !location || !examDate) {
            return res.status(400).json({
                message: "Missing required fields: name, email, phone, subject, location, and examDate are mandatory.",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if the course exists and has available seats
        const course = await Course.findOne({ subject: subject });
        // if (!course) {
        //     return res.status(404).json({ message: "Course not found" });
        // }

        const examCentre = await ExamCentre.findOne({ place: location });
        // if (!examCentre) {
        //     return res.status(404).json({ message: "Exam centre not found" });
        // }

        // if (examCentre.availableSeats <= 0) {
        //     return res.status(400).json({ message: "No seats available at this exam centre" });
        // }

        // Decrement available seats
        // examCentre.availableSeats -= 1;
        // await examCentre.save();

        // Create a new Form entity with the unified format
        const formEntity = {
            name,
            email,
            phone,
            subject,
            location,
            examDate: new Date(examDate),
        };

        // Save the form entity to the database
        const newForm = new Form(formEntity);
        await newForm.save();

        res.status(201).json({
            message: "Registered Successfully",
            data: formEntity,
            // availableSeats: examCentre.availableSeats,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Failed to register",
            error: error.message,
        });
    }
});



router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});


//(Admin Use)
// router.post('/courses', async (req, res) => {
//     const { selectedCourse, totalSeats } = req.body;

//     if (!selectedCourse || !totalSeats) {
//         return res.status(400).json({ message: "Course name and total seats are required" });
//     }

//     try {
//         let course = await Course.findOne({ selectedCourse });

//         if (course) {
//             // Update existing course
//             course.totalSeats = totalSeats;
//             course.availableSeats = totalSeats - (course.totalSeats - course.availableSeats); 
//         } else {
//             // Create a new course
//             course = new Course({
//                 selectedCourse,
//                 totalSeats,
//                 availableSeats: totalSeats,
//             });
//         }

//         await course.save();
//         res.status(201).json({ message: "Course updated successfully", course });
//     } catch (error) {
//         console.error("Error updating course:", error);
//         res.status(500).json({ message: "Failed to update course" });
//     }
// });

module.exports = router;
