const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
  company: {
    type: ObjectId,
    ref: "Company",
  },
});

module.exports = mongoose.model("Chat");
