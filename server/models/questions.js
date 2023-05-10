const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  Question: { type: String, required: true, unique: true },
  correctAns: { type: String, required: true },
  incorrectAns1: { type: String, required: true },
  incorrectAns2: { type: String, required: true },
  incorrectAns3: { type: String, required: true },
  Category: { type: String, required: true},
},
{
  collection: "questions",
});

const QuestionModel = mongoose.model('Questions', questionSchema);
module.exports = QuestionModel;