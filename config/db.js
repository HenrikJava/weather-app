const mongoose = require("mongoose");

const config = require("config");
const atlasDb = config.get("mongoURIAtlas");
const localDb = config.get("mongoURILocal");
//Creating mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect(atlasDb || localDb, {
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
