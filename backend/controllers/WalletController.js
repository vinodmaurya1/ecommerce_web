const model = require("../models/userModel");
const walletModel = require("../models/WalletTransactionModel");
const userwalletModel = require("../models/userWalletModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = model.User;
const Wallet = walletModel.Wallet;
const UserWallet = userwalletModel.UserWallet;
const uuid = require("uuid");

exports.AddCash = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Authentication failed Token missing." });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Authentication failed Invalid token.",
        });
      }
      const transactionId = uuid.v4();
      const existingTransaction = await Wallet.findOne({
        transaction_id: transactionId,
      });
      if (existingTransaction) {
        return res
          .status(400)
          .json({ success: false, msg: "Transaction ID already exists." });
      }

      const wallet = new Wallet({
        transaction_id: transactionId,
        ...req.body,
      });
      const saveWallet = await wallet.save();
      return res.status(200).json({
        success: true,
        message: "Request send successfully!",
        data: saveWallet,
      });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

exports.GetWalletTransaction = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Authentication failed Token missing." });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Authentication failed Invalid token.",
        });
      }
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const wallet = await Wallet.find().populate('user_id');

        return res.status(200).json({
          success: true,
          message: "Wallet transaction detail",
          data:wallet,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Failed!",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

exports.UserWalletTransaction = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Authentication failed Token missing." });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Authentication failed Invalid token.",
        });
      }
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const wallet = await UserWallet.find({ user_id: req.body.user_id });
        return res.status(200).json({
          success: true,
          message: "Wallet transaction detail",
          data: wallet,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Failed!",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Authentication failed Token missing." });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Authentication failed Invalid token.",
        });
      }
      const user = await User.findById(req.body.user_id);

      if (req.body.wallet_transaction_id.trim().length !== 24) {
        return res
          .status(400)
          .send({ status: false, message: "Enter a valid transaction ID." });
      }

      if (user) {
        const wallet = await Wallet.findOne({
          _id: req.body.wallet_transaction_id,
        });
        // status ===   0 for pending , 1 for approved and 2 for reject
        if (!wallet) {
          return res
            .status(404)
            .json({ success: false, message: "Wallet transaction not found." });
        } else if (wallet.status === 1) {
          return res
            .status(404)
            .json({ success: false, message: "Wallet already updated!" });
        }

        // Update wallet status
        wallet.status = req.body.status;
        if (req.body.status === 1) {
          user.wallet += wallet.rupee;
          await user.save();
          const userWallet = new UserWallet({
            status: 2, // 1 debit , 2 credit
            type: "Add Cash", 
            amount: wallet.rupee,
            wallet_balance: user.wallet,
            user_id : user._id
          });
          await userWallet.save();
        }

        const saveWallet = await wallet.save();

        return res.status(200).json({
          success: true,
          message: "Wallet updated",
          data: saveWallet,
          user: user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Failed!",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};
