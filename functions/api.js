require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Sample Schema and Model
const itemSchema = new mongoose.Schema({
    name: String,
});
app.get('/.netlify/functions/api/student/all',async (req, res) => {
  try {
      const studentData = await Student.find();
      res.status(200).json({student:studentData});
    } catch (error) {
    console.log(error);
      res.status(500).json({ message: error.message });
    }
})
// Use the routes with the appropriate path prefix


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Wrap the handler in a try-catch block
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  try {
    console.log('Function started');
    const result = await handler(event, context);
    console.log('Function completed successfully');
    return result;
  } catch (error) {
    console.error('Function failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};
