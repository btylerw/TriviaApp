const router = require('express').Router();
const User = require('../models/user');
const Score = require('../models/score')

// Uses User schema to save user to database
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    const userScore = new Score({username, score:0});
    await userScore.save();
    res.status(201).json('User registered successfully');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Uses User schema to retrieve username from database
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (user) {
      console.log(user);
      res.status(200).json(user);
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
});

// Uses Score schema to retrieve user score from database
router.get('/score/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const scoreObj = await Score.findOne({username: username});
    if (scoreObj) {
      res.status(200).json({score: scoreObj.score});
    } else {
      res.status(404).json('User not found');
    }
  }
  catch (error) {
    res.status(500).json('Error' + error);
  }
});

// Uses score schema to retrieve all user scores from database
router.get('/allScores', async (req, res) => {
  try {
    const allScores = await Score.find({});
    res.send(allScores);
  } catch (error) {
    console.error(error);
  }
})

// Uses score schema to save score to database
router.post("/sendScores", async (req, res) => {
  const { username, newscore } = req.body;
  try {
    const updateScore = await Score.updateOne({username: username}, {$set: {score: newscore}}, {upsert: true});
    res.status(201).json('Score saved successfully');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
