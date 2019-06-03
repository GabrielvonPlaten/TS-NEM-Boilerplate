const mongoose = require('mongoose');
const config = require('config');

// Change your Database URI in the config file
const db = config.get('mongoURI');
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected.');
  } catch (err) {
    console.log(err.message);
    process.exit(1); // Application will fail if a connection is not established
  }
};


module.exports = {
  connectDB,
};