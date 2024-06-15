const mongoose = require('mongoose');

const connectDBforLogin = async () => {
  try {
    //mongodb connection string
    const connect = await mongoose.connect(process.env.MONGO_URI_1);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDBforLogin;
