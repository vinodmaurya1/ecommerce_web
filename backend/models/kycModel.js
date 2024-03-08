const mongoose = require("mongoose");
const { Schema } = mongoose;

const KycSchema = new Schema({
  adhar_no: { type: String, required: true },
  adhar_front: { type: String, required: true },
  adhar_back: { type: String, required: true },
  pan_no: { type: String, required: true },
  pan_img: { type: String, required: true },
});


exports.Kyc = mongoose.model('kycs', KycSchema);