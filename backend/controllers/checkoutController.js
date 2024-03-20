const model = require("../models/userModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartModel");
const orderModel = require("../models/orderModel");
const checkoutModel = require("../models/checkoutModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = model.User;
const Cart = cartModel.Cart;
const Order = orderModel.Order;
const Checkout = checkoutModel.Checkout;



// success link
//http://localhost:3000/profile_info?payment_intent=pi_3OusJVSIntRVZuwI0QbFPQJM&
//payment_intent_client_secret=pi_3OusJVSIntRVZuwI0QbFPQJM_secret_lpk66sfIrXdAtw19KVVFBr9Up&
//redirect_status=succeeded


exports.Checkout = async (req, res) => {
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

      let cart = await Cart.findOne({ user_id: user._id });
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty.",
        });
      }

      const order = new Checkout({
        user_id: user._id,
        products: cart.products,
        totalAmount: cart.subTotal,
      });
      
      await order.save();

      // Clear the cart
      cart.products = [];
      cart.subTotal = 0;
      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Checkout successfull.",
        data: order,
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