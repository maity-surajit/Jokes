const mongoose = require("mongoose");

//connection of mongodb
async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDB,
};
