const mongoose = require("mongoose");

const quiz_schema = mongoose.Schema({
  name: { type: String, unique: true },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("quiz", quiz_schema);
