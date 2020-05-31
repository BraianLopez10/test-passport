const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
  },
  username: {
    type: mongoose.Schema.Types.String,
  },
  password: {
    type: mongoose.Schema.Types.String,

    minlength: 6,
  },
  photo: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  facebookId: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("user", userSchema);
