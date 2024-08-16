const express = require('express');
const serverless = require('serverless-http');

const app = express();

// const courseRoutes = require('../routes/courseRoutes');
// const instructorRoutes = require('../routes/instructorRoutes');
// const studentRoutes = require('../routes/studentRoutes');
// const takeRoutes = require('../routes/takeRoutes');

// app.use('/.netlify/functions/api/course', courseRoutes);
// app.use('/.netlify/functions/api/instructor', instructorRoutes);
// app.use('/.netlify/functions/api/student', studentRoutes);
// app.use('/.netlify/functions/api/take', takeRoutes);

//Your existing Express routes
// app.get('/.netlify/functions/api/course/all', (req, res) => {
//   res.json({ message: 'Hello World' });

  // Import routes from the root-level routes folder
const courseRoutes = require('../routes/courseRoutes'); 
app.use('/.netlify/functions/api/course', courseRoutes);
});

module.exports.handler = serverless(app);
