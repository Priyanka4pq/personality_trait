const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const GradeRange = require('../models/GradeRange');
const TraitRange = require('../models/TraitRange');

// POST /api/personality - Calculate personality trait
router.post('/personality', async (req, res) => {
  const { name, subject1, subject2, subject3 } = req.body;

  if (!name || subject1 == null || subject2 == null || subject3 == null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const avg = (subject1 + subject2 + subject3) / 3;

  try {
    // Save student
    const student = new Student({
      name,
      subject1,
      subject2,
      subject3,
      average: avg
    });
    await student.save();

    // Find grade
    const gradeDoc = await GradeRange.findOne({
      minAvg: { $lte: avg },
      maxAvg: { $gte: avg }
    });

    if (!gradeDoc) {
      return res.status(404).json({ error: 'No matching grade range' });
    }

    // Find trait
    const traitDoc = await TraitRange.findOne({
      minGrade: { $lte: gradeDoc.grade },
      maxGrade: { $gte: gradeDoc.grade }
    });

    if (!traitDoc) {
      return res.status(404).json({ error: 'No matching personality trait' });
    }

    res.json({
      name,
      average: avg.toFixed(2),
      grade: gradeDoc.grade,
      personalityTrait: traitDoc.trait
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// THIS LINE WAS MISSING OR INCORRECT!
module.exports = router;