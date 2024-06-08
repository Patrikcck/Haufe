const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the connectDB function

dotenv.config();

const authRoutes = require('./routes/auth');
const recommendationRoutes = require('./routes/recommendations');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB(); // Call the connectDB function to establish the database connection

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
