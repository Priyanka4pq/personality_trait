const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  subject1: Number,
  subject2: Number,
  subject3: Number,
  average: Number
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;