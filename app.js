const express = require('express');
const { connectDB } = require('./config/db');

// Routes
const userRouters = require('./routes/api/user');
const authRouters = require('./routes/api/auth');

// Initialize app
const app = express();

//Connect Database
connectDB();

// Inits Middleware
app.use(express.json({ extended: false }));

// Use Routes
app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);

// Initiate Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running at port ' + PORT)
});