const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    subTotal: { type: Number },
    products: [
      {
        product_id: { type: Schema.Types.ObjectId, required: true },
        quantity: Number,
        name: String,
        amount: Number,
        product_img: String,
        total: Number
      }
    ],
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// let ItemSchema = new Schema(
//   {
//     product_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "products",
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: [1, "Quantity can not be less then 1."],
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     total: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const CartSchema = new Schema(
//   {
//     items: [ItemSchema],
//     subTotal: {
//       default: 0,
//       type: Number,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

CartSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.Cart = mongoose.model("cart", CartSchema);
