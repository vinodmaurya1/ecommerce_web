const mongoose = require("mongoose");
const { Schema } = mongoose;

const AreaSchema = new Schema({
  name: { type: String, required: true },
  city_id: { type: Schema.Types.ObjectId, required: true },
  city_name: { type: String, required: true },
});

exports.Area = mongoose.model('areas', AreaSchema);