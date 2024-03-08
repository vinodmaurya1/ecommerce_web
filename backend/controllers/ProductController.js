const model = require("../models/userModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartModel");
const orderModel = require("../models/orderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = model.User;
const Product = productModel.Product;
const Cart = cartModel.Cart;
const Order = orderModel.Order;

exports.AddProduct = async (req, res) => {
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
      const product = new Product(req.body); 
      if (req.file) {
        product.product_img = req.file.path;
      }
      const saveProduct = await product.save();
      return res.status(200).json({
        success: true,
        message: "product added successfully!",
        data: saveProduct,
      });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.GetProductById = async (req, res) => {
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
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const product = await Product.findOne({ _id: req.body._id });
        // const data = product((products) => ({
        //   ...products._doc,
        //   product_img_url: `${req.protocol}://${req.get("host")}/${
        //     products.product_img
        //   }`,
        // }));
        if (!product) {
          return res.status(400).json({
            success: false,
            message: "Product not found!",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Product fetch successfully!",
          data: {
            ...product._doc,
            product_img_url: `${req.protocol}://${req.get("host")}/${
              product.product_img
            }`,
          },
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
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.ActiveProduct = async (req, res) => {
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
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const product = await Product.findById(req.body._id);
        if (!product) {
          return res.status(400).json({
            success: false,
            message: "Product not found!",
          });
        }
        if (product.active) {
          product.active = false;
        } else {
          product.active = true;
        }
        await product.save();
        return res.status(200).json({
          success: true,
          message: "Product updated successfully!",
          data: product,
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
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.GetAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    const data = product.map((products) => ({
      ...products._doc,
      product_img_url: `${req.protocol}://${req.get("host")}/${
        products.product_img
      }`,
    }));
    return res.status(200).json({
      success: true,
      message: "All product list",
      data: data,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.AllCartDetails = async (req, res) => {
  try {
    const cart = await Cart.find();
    const cartChange = cart.length > 0 ? cart[0] : {};
    if (cartChange.products && cartChange.products.length > 0) {
      cartChange.products.forEach((product) => {
        product.product_img = `${req.protocol}://${req.get(
          "host"
        )}/${product.product_img.replace(/\\/g, "/")}`;
      });
    }
    return res.status(200).json({
      success: true,
      message: "All cart product list",
      data: cartChange,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.AddToCart = async (req, res) => {
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

      const { product_id, quantity } = req.body;
      const product = await Product.findById(product_id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found.",
        });
      }

      let cart = await Cart.findOne({ user_id: user._id });

      if (!cart) {
        cart = new Cart({
          user_id: user._id,
          products: [],
        });
      }

      const existingProductIndex = cart.products.findIndex(
        (item) => String(item.product_id) === String(product_id)
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
        if (cart.products[existingProductIndex].quantity <= 0) {
          cart.products.splice(existingProductIndex, 1);
        }
      } else {
        cart.products.push({
          product_id,
          quantity,
          name: product.name,
          amount: product.amount,
          product_img: product.product_img,
        });
      }

      cart.products.forEach((item) => {
        item.total = item.quantity * item.amount;
      });
      cart.subTotal = cart.products.reduce(
        (total, item) => total + item.total,
        0
      );

      const saveCart = await cart.save();
      // const productImg = `${req.protocol}://${req.get("host")}/${product.product_img}`
      return res.status(200).json({
        success: true,
        message: "Added to cart successfully.",
        data: saveCart,
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

exports.RemoveFromCart = async (req, res) => {
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

      const product_id = req.params.id;

      const cart = await Cart.findOne({ user_id: user._id });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found.",
        });
      }

      const index = cart.products.findIndex(
        (item) => String(item.product_id) === String(product_id)
      );

      // console.log("index" , index , product_id)

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Product not found in the cart.",
        });
      }

      cart.products.splice(index, 1);

      cart.subTotal = cart.products.reduce(
        (total, item) => total + item.quantity * item.amount,
        0
      );

      const saveCart = await cart.save();

      return res.status(200).json({
        success: true,
        message: "Product removed from cart successfully.",
        data: saveCart,
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

exports.OrderBook = async (req, res) => {
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
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        const order = new Order(req.body);
        const saveOrder = await order.save();
        return res.status(200).json({
          success: true,
          message: "Order Placed successfully!",
          data: saveOrder,
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
      .json({ success: false, message: "Internal Server Error" });
  }
};
