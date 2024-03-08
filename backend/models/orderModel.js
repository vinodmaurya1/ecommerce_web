const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    status: { type: Number, default: 0 },
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: { type: Number },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.Order = mongoose.model("order", userSchema);
