const router = require('express').Router();
const User = require('../models/questions');

router.get('/questions/:Question', async (req, res) => {
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
