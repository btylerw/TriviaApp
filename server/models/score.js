const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    username: { type: String, required: true, unique: true},
    score: { type: Number, required: true}
}, {
    collection: "scores",
});
  
const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;