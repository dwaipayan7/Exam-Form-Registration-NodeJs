const express = require('express');
const mongoose = require('mongoose');
const { Form, Course } = require('../models/formModel');

const router = express.Router();

// Route for handling form registration
router.post('/register', async (req, res) => {
    const { name, email, phone, selectedCourse, dob } = req.body;

    // Validation: Check if required fields are present
    if (!name || !email || !phone || !selectedCourse || !dob) {
        return res.status(400).json({
            message: "Missing required fields: name, email, phone, selectedCourse, and dob are mandatory.",
        });
    }

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    try {
        // Check if the course has available seats
        const course = await Course.findOne({ selectedCourse });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (course.availableSeats <= 0) {
            return res.status(400).json({ message: "No seats available for this course" });
        }

        // Decrement available seats
        course.availableSeats -= 1;
        await course.save();

        // Create new form document
        const newForm = new Form({
            name,
            email,
            phone,
            selectedCourse,
            dob,
        });

        await newForm.save();

        res.status(201).json({
            message: 'Registered Successfully',
            data: newForm,
            availableSeats: course.availableSeats,
        });
    } catch (error) {
        console.error("Error during registration:", error);

        res.status(500).json({
            message: "Failed to register",
            error: error.message,
        });
    }
});

// Route to display available seats for all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

// Route to create or update a course (Admin Use)
router.post('/courses', async (req, res) => {
    const { selectedCourse, totalSeats } = req.body;

    if (!selectedCourse || !totalSeats) {
        return res.status(400).json({ message: "Course name and total seats are required" });
    }

    try {
        let course = await Course.findOne({ selectedCourse });

        if (course) {
            // Update existing course
            course.totalSeats = totalSeats;
            course.availableSeats = totalSeats - (course.totalSeats - course.availableSeats); 
        } else {
            // Create a new course
            course = new Course({
                selectedCourse,
                totalSeats,
                availableSeats: totalSeats,
            });
        }

        await course.save();
        res.status(201).json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
});

module.exports = router;
