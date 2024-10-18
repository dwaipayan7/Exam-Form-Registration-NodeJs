const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/formModel');

const router = express.Router();

// Route for handling form registration
router.post('/register', async (req, res) => {
    const { name, email, phone, examCourse, dob } = req.body;

    // Validation: Check if required fields are present
    if (!name || !email || !phone || !examCourse || !dob) {
        return res.status(400).json({
            message: "Missing required fields: name, email, phone, examCourse, and dob are mandatory.",
        });
    }

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }

    // Create new form document
    const newForm = new Form({
      name,
      email,
      phone,
      examCourse,
      dob,
    });

    try {
        // Save the validated form data to the database
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

router.get('/register', async(req, res) =>{

   try {
    
    let response = await Form.find();
    console.log("Data Fetched");
    res.status(200).json(response);

   } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Failed to fetch data" });
    
   }


});

module.exports = router;
