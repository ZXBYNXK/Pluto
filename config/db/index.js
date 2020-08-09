const mongoose = require("mongoose");
const { mongoUri } = require("../index");
module.exports = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to database.")
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
