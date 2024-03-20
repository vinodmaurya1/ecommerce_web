const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkoutSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{
    product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, default: 1 },
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: Number, required: true },
}, { timestamps: true });

checkoutSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password; 
    return ret;
  },
});

exports.Checkout = mongoose.model("checkout", checkoutSchema);
