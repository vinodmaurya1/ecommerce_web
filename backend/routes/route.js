const express = require("express");
const path = require("path")
const router = express.Router();
const authController = require('../controllers/authController');
const locationController = require('../controllers/locationController');
const walletController = require('../controllers/WalletController');
const productController = require('../controllers/ProductController');
const emailController = require('../controllers/emailController');
const couponController = require('../controllers/couponCodeController');
const checkoutController = require('../controllers/checkoutController');
const bookingController = require('../controllers/bookingController');
const { authorization } = require("../middleware/auth");
const multer = require('multer');
const kycUploadMiddleware = require("../middleware/kycUploadMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// auth apis


router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.post('/logout', authController.logout)
router.delete('/user_delete/:id', authController.deleteUser);
router.get('/user_details',authorization, authController.getUserDetails)
router.get('/all_user_details', authController.getAllUsersDetails)
router.post('/user_update',authorization,upload.single('profile_img'), authController.UpdateUserDetails)
router.get('/get_kyc_details',authorization, authController.getKycDetails)
router.post('/kyc_upload', authorization, upload.fields([
  { name: 'adhar_front', maxCount: 1 },
  { name: 'adhar_back', maxCount: 1 },
  { name: 'pan_img', maxCount: 1 }
]), authController.KycUpload);


// city apis
router.post('/add_city', locationController.createCity)
router.get('/get_city', locationController.getCity)
router.post('/add_area', locationController.createArea)
router.post('/get_area', locationController.getArea)
router.post('/add_location', locationController.createLocation)
router.post('/get_location', locationController.getLocation)


// wallet 

router.post('/add_cash' ,walletController.AddCash)
router.post('/get_transaction_details',authorization ,walletController.GetWalletTransaction)
router.post('/update_wallet',authorization ,walletController.updateWallet)
router.post('/user_wallet_transactions',authorization ,walletController.UserWalletTransaction)


// products 
router.post('/add_product',authorization,upload.single('product_img'),productController.AddProduct)
router.post('/get_product',authorization,productController.GetProductById)
router.get('/get_all_product',productController.GetAllProduct)
router.get('/get_all_product_cart',productController.AllCartDetails)
router.post('/add_cart',authorization,productController.AddToCart)
router.post('/placed_order',authorization,productController.OrderBook)
router.delete('/remove_to_cart/:id',authorization, productController.RemoveFromCart);
router.post('/active_product',authorization, productController.ActiveProduct);


// coupon 
router.post('/add_coupon',authorization, couponController.AddCouponCode);
router.post('/redeem_coupon',authorization, couponController.RedeemCouponCode);

// checkout
router.post('/checkout',authorization, checkoutController.Checkout);



// booking
router.post('/booking',authorization, bookingController.Booking);
router.get('/booking_detail',authorization, bookingController.GetBooking);


router.post('/email_send', emailController.sendEmail)
// router.use('/uploads', express.static('uploads'));

// router.use((req, res, next) => {
//   if (!req.originalUrl.startsWith('/uploads')) {
//     res.status(200).send({ status: true, message: "Welcome to the Node.js backend" });
//   } else {
//     next();
//   }
// });


module.exports = router;


// const authController = require('../controller/auth')
// const express = require('express');
// const router = express.Router();

// router.post('/signUp', authController.signUp)
// router.post('/login', authController.login)

// exports.router = router;  