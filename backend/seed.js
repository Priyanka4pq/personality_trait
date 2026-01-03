const GradeRange = require('./models/GradeRange');
const TraitRange = require('./models/TraitRange');

const seedData = async () => {
  // Clear existing data
  await GradeRange.deleteMany({});
  await TraitRange.deleteMany({});

  // Insert Grade Ranges
  const grades = [
    { minAvg: 90, maxAvg: 100, grade: 5 },
    { minAvg: 80, maxAvg: 89.99, grade: 4 },
    { minAvg: 70, maxAvg: 79.99, grade: 3 },
    { minAvg: 60, maxAvg: 69.99, grade: 2 },
    { minAvg: 50, maxAvg: 59.99, grade: 1 },
    { minAvg: 0, maxAvg: 49.99, grade: 0 }
  ];
  await GradeRange.insertMany(grades);

  // Insert Personality Traits
  const traits = [
    { minGrade: 4, maxGrade: 5, trait: 'Leader' },
    { minGrade: 2, maxGrade: 3, trait: 'Thinker' },
    { minGrade: 0, maxGrade: 1, trait: 'Artist' }
  ];
  await TraitRange.insertMany(traits);

  console.log('Seed data inserted successfully!');
};

module.exports = seedData;