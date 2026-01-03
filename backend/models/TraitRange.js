const mongoose = require('mongoose');

const traitRangeSchema = new mongoose.Schema({
  minGrade: Number,
  maxGrade: Number,
  trait: String
});

const TraitRange = mongoose.model('TraitRange', traitRangeSchema);

module.exports = TraitRange;