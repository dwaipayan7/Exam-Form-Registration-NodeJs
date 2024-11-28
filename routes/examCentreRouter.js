const express = require('express');
const ExamCentre = require('../models/examCentre');
const router = express.Router();

// Get all exam centers
router.get('/exam-centres', async (req, res) => {
  try {
    const examCentres = await ExamCentre.find();
  //  if (!examCentres) {
  //   console.log("first")
  //  }
    // console.log(examCentres)
    res.status(200).json(examCentres);
  } catch (error) {
    console.error("Error fetching exam centers:", error);
    res.status(500).json({ message: "Failed to fetch exam centers" });
  }
});

module.exports = router;
