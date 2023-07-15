const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Routes
const authSignupRouter = require('./routes/auth/signup');
const authLoginRouter = require('./routes/auth/login');
const meetupsRouter = require('./routes/meetups');

app.use('/signup', authSignupRouter);
app.use('/login', authLoginRouter);
app.use('/meetups', meetupsRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
