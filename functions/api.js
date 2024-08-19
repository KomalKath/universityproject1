const express = require('express');
const serverless = require('serverless-http');
const connectDB = require ('../db/connection');
const app = express();

// Import routes from the root-level routes folder
//const courseRoutes = require('../routes/courseRoutes');

// Middleware to log requests
connectDB();
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});
app.get('/.netlify/functions/api/student/all',async (req, res) => {
  try {
      const studentData = await Student.find();
      res.status(200).json({student:studentData});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})
// Use the routes with the appropriate path prefix
app.use('/.netlify/functions/api/course', courseRoutes);

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
