const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  status: { type: Number, default: 1 },
  quantity: { type: Number, default: 1 },
  product_name: { type: String},
  product_img: { type: String},
  price: { type: Number},
  total: { type: Number},
  modifiedOn: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


bookingSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});


exports.Booking = mongoose.model("booking", bookingSchema);