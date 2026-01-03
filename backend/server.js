const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://personality-trait-seven.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Student = require('./models/Student');
const GradeRange = require('./models/GradeRange');
const TraitRange = require('./models/TraitRange');

// Routes

app.use('/api', require('./routes/api'));

// Seed Route (Run once)
app.get('/seed', async (req, res) => {
  try {
    const seedData = require('./seed');
    await seedData();
    res.send('Database seeded successfully!');
  } catch (err) {
    res.status(500).send('Seeding error: ' + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});