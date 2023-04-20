const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://admin:XVyy4SqW2Ow73Ioo@triviaapp.xftlph2.mongodb.net/Users?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const usersRouter = require('./routes/users');

// Use routes
app.use('/users', usersRouter);

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

require("./models/questions");
const Questions = mongoose.model("Questions");

// Gets all question data from database
app.get("/getQuestions", async (req, res) => {
  try {
    const allQuestions = await Questions.find({});
    res.send({allQuestions})
  } catch (err) {
    console.log(err);    
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
