const mongoose = require("mongoose");
const { Schema } = mongoose;

const CitySchema = new Schema({
  name: { type: String, required: true },
});


exports.City = mongoose.model('cities', CitySchema);