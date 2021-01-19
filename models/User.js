const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favourite_city: {
    type: String,
  },

  avatar: {
    type: String,
  },
  photo: {
  

  },
  fahrenheit_on: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
