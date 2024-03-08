const model = require("../models/userModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartModel");
const orderModel = require("../models/orderModel");
const checkoutModel = require("../models/checkoutModel");
const bookingModel = require("../models/bookingModel");
const userwalletModel = require("../models/userWalletModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserWallet = userwalletModel.UserWallet;
const User = model.User;
const Cart = cartModel.Cart;
const Order = orderModel.Order;
const Checkout = checkoutModel.Checkout;
const Booking = bookingModel.Booking;
const Product = productModel.Product;

exports.Booking = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token missing.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. Invalid token.",
        });
      }

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      }

      const cart = await Cart.findOne({ user_id: req.body.user_id });
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty.",
        });
      }

      if (cart.subTotal > user.wallet) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Balance!",
        });
      }
      if (cart) {
        user.wallet -= cart.subTotal;
        await user.save();
        const userWallet = new UserWallet({
          status: 1, // 1 debit , 2 credit
          type: "Shopping",
          amount: cart.subTotal,
          wallet_balance: user.wallet,
          user_id: user._id,
        });
        await userWallet.save();
      }

      const bookings = [];
      for (const productItem of cart.products) {
        const { product_id, quantity, total, amount } = productItem;
        const product = await Product.findById(product_id);
        const booking = new Booking({
          user_id: user._id,
          product_id,
          product_name: product.name,
          product_img: product.product_img,
          price: amount,
          total,
          quantity,
          status: 1, // 1 success ,2 pending , 3 failed
        });
        const savedBooking = await booking.save();
        bookings.push(savedBooking);
      }

      cart.products = [];
      cart.subTotal = 0;
      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Booking successfully",
        data: bookings,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.GetBooking = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token missing.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. Invalid token.",
        });
      }

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      }

      const bookingDetails = await Booking.find();
      const data = bookingDetails.map((bookings) => ({
        ...bookings._doc,
        product_img_url: `${req.protocol}://${req.get("host")}/${
          bookings.product_img
        }`,
      }));
      return res.status(200).json({
        success: true,
        message: "Booking list",
        data: data,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
