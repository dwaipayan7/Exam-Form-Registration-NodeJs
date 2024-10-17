const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/formModel');

const router = express.Router();

// Route for handling form registration
router.post('/register', async (req, res) => {
    // const formData = req.body;
//------> Using the formData 
    // if (!formData.name || !formData.email || !formData.phone) {
    //     return res.status(400).json({
    //         message: "Missing required fields: name, email, and registration number are mandatory.",
    //     });
    // }

    const { name, email, phone, examCourse, dob } = req.body;

    // Create new form document
    const newForm = new Form({
      name,
      email,
      phone,
      examCourse,
      dob,
    });
//------> Using the formData 

    // Additional validation checks (e.g., check if email is valid)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //     return res.status(400).json({
    //         message: "Invalid email format",
    //     });
    // }

    try {
        // If validation passes, save the form data to the database
        // const newForm = new Form(formData);
        await newForm.save();

        res.status(201).json({
            message: 'Registered Successfully',
            data: newForm,
        });
    } catch (error) {
        console.log("Error saving form data", error);

        res.status(500).json({
            message: "Failed to register",
            error: error.message,
        });
    }
});

module.exports = router;
