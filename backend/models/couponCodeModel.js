const mongoose = require("mongoose");
const { Schema } = mongoose;

const codeSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    status: { type: Number, default: 0 },
    coupon_name: { type: String, require: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

codeSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.Coupon = mongoose.model("coupons", codeSchema);