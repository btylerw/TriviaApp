const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
//const mongoose = require('mongoose');
//const mongoURL = 'mongodb+srv://admin:XVyy4SqW2Ow73Ioo@triviaapp.xftlph2.mongodb.net/Users?retryWrites=true&w=majority';

const connectUsersDB = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const { connect } = require('mongoose');

// Use routes
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);

// Connect to database
connectUsersDB();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
