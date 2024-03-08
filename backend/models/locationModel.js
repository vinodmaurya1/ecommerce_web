const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  city_id: { type: Schema.Types.ObjectId, required: true },
  city_name: { type: String, required: true },
  area_id: { type: Schema.Types.ObjectId, required: true },
  area_name: { type: String, required: true },
});


exports.Location = mongoose.model('locations', LocationSchema);