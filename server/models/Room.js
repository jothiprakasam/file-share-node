const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }, // Add password field
  files: [{ name: String, path: String }],
});

module.exports = mongoose.model("Room", roomSchema);
