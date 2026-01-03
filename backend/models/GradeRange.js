const mongoose = require('mongoose');

const gradeRangeSchema = new mongoose.Schema({
  minAvg: Number,
  maxAvg: Number,
  grade: Number
});

const GradeRange = mongoose.model('GradeRange', gradeRangeSchema);

module.exports = GradeRange;