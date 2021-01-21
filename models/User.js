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
  type: String,

  },
  fahrenheit_on: {
    type: Boolean,
  },
  resetPasswordToken: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
