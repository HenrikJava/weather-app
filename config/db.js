const mongoose = require("mongoose");
require("dotenv").config();

/* const config = require("config");
const localDb = config.get("mongoURILocal"); */
//Creating mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
