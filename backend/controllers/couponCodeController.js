const model = require("../models/userModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartModel");
const orderModel = require("../models/orderModel");
const couponModel = require("../models/couponCodeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = model.User;
const Product = productModel.Product;
const Cart = cartModel.Cart;
const Order = orderModel.Order;
const Coupon = couponModel.Coupon;

exports.AddCouponCode = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed Token missing.",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed Invalid token.",
        });
      }
      const coupon = new Coupon(req.body);
      const savecoupon = await coupon.save();
      return res.status(200).json({
        success: true,
        message: "Coupon added successfully!",
        data: savecoupon,
      });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.RedeemCouponCode = async (req, res) => {
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

      const couponCode = await Coupon.findOne({
        coupon_name: req.body.coupon_name,
      });

      if (!couponCode) {
        return res.status(401).json({
          success: false,
          message: "Invalid Coupon Code",
        });
      }

      if (couponCode.status === 2) {
        return res.status(401).json({
          success: false,
          message: "Expired Coupon Code",
        });
      }

      if (couponCode.used) {
        return res.status(401).json({
          success: false,
          message: "Coupon has already been used",
        });
      }

      const cart = await Cart.findOne({ user_id: couponCode.user_id });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });
      }

      if (req.body.coupon_name === "VID15") {
        cart.subTotal *= 0.85;
        couponCode.used = true;
      } else if (req.body.coupon_name === "VID20") {
        cart.subTotal *= 0.8;
        couponCode.used = true;
      }
      await couponCode.save();

      // Save the updated cart if it exists
      const savedCart = await cart.save();
      return res.status(200).json({
        success: true,
        message: "Coupon applied successfully!",
        data: savedCart,
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
