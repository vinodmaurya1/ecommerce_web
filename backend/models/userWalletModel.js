const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema(
  {
    amount: { type: Number },
    user_id:{ type: Schema.Types.ObjectId, required: true},
    wallet_balance: { type: Number },
    type: { type: String },
    status: { type: Number },
    modifiedOn: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);


exports.UserWallet = mongoose.model("user_wallet", walletSchema);