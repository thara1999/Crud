const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 2000;

const logger = require('./middleware'); // Import the logger middleware
const routes = require('./routes');  // Import the routes
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => console.error('MongoDB connection error:', error));

// Use the logger middleware
app.use(logger);
app.use(cors({
    origin: 'http://localhost:5173' // Replace with the URL of your frontend
}));

// Built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
