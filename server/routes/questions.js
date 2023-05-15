const router = require('express').Router();
const QuestionModel = require('../models/questions');

// Uses question schema to get all questions from database
router.get("/getQuestions", async (req, res) => {
    try {
      const allQuestions = await QuestionModel.find({});
      res.send({allQuestions})
    } catch (err) {
      console.log(err);    
    }
});

// Uses question schema to create a new question in database
router.post("/newQuestions", async (req, res) => {
    const { Question, correctAns, incorrectAns1, incorrectAns2, incorrectAns3, Category } = req.body;
    try {
      const newQuestion = new QuestionModel({ Question, correctAns, incorrectAns1, incorrectAns2, incorrectAns3, Category });
      await newQuestion.save();
      res.status(201).json('Question registered successfully');
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  });

module.exports = router;
