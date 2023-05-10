const router = require('express').Router();
const User = require('../models/user');
const Score = require('../models/score')

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

module.exports = router;
