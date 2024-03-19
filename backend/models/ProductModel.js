const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id:{ type: Schema.Types.ObjectId, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    category: { type: Number , default:1},
    quantity: { type: Number, required: true},
    product_img: { type: String, required: true},
    amount: { type: Number, required: true },
    active: { type: Boolean},
  },
  { timestamps: true }
);



userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.Product = mongoose.model("products", userSchema);
