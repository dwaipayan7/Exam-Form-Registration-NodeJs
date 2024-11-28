const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/courseModel');
const router = express.Router();

// Route to get all subjects
router.get('/subjects', async (req, res) => {
    try {
        // Fetch all courses with 'subject' and '_id' fields
        const courses = await Course.find({}, 'subject _id');
        
        // Extract the subjects and their IDs from the course documents
        const subjects = courses.map(course => ({
            id: course._id,
            subject: course.subject
        }));
        
        // Send the subjects and their IDs as a response
        res.status(200).json({ subjects });
    } catch (error) {
        // console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Unable to fetch subjects' });
    }
});

module.exports = router;
