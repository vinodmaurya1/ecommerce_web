const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    transaction_id: { type: String, required: true, unique: true },
    user_id:{ type: Schema.Types.ObjectId, ref: 'users', required: true},
    rupee: { type: Number },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.Wallet = mongoose.model("wallet_transactions", userSchema);
