const model = require("../models/userModel");
const kycModel = require("../models/kycModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = model.User;
const Kyc = kycModel.Kyc;
const {
  validname,
  validEmail,
  validMobile,
  validPass,
} = require("../validation/valid");



exports.signUp = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body is empty can't craeate data" });
    }

    if (!data.name.trim() || validname.test(data.name)) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid name" });
    }

    if (!data.email.trim() || !validEmail.test(data.email.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid email" });
    }
 

    if (!data.phone.trim() || !validMobile.test(data.phone.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid phone No" });
    }

    if (!data.password.trim() || !validPass.test(data.password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be in-between 8-15 characters and must contain one of 0-9,A-Z,a-z and special character",
      });
    }

    let oldUser = await User.findOne({
      $or: [{ phone: data.phone }, { email: data.email }],
    });
    if (oldUser) {
      return res.status(400).send({
        status: false,
        message: "User already exist with this phone no or email Id",
      });
    }


    const user = new User(req.body);
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "SignUp successfully!",
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
    const isAuth = bcrypt.compareSync(req.body.password, user.password);
    console.log(isAuth, "auth");
    if (isAuth) {
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ email: user.email, name: user.name }, secretKey);
      user.token = token;
      const savedUser = await user.save();
      return res.status(200).json({
        success: true,
        message: "SignIn successfully!",
        user: savedUser,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const token = req.header("Authorization");
    // console.log(process.env.JWT_SECRET)
    // console.log(token)
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed. Token missing." });
    }
    // const tokenValue = token.replace("Bearer || ", "");
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ success: false, message: "Your token has expired." });
        } else {
          return res.status(401).json({
            success: false,
            message: "Authentication failed. Invalid token.",
          });
        }
      }

      const user = await User.findOne({ email: decoded.email });

      if (!user.token) {
        return res
          .status(401)
          .json({ success: false, message: "Your token has been expired." });
      }
  
      const userWithoutCircularReferences = user.toJSON();
      // console.log('User Details:', userWithoutCircularReferences);
      // console.log(user)
      if (user) {
        const data = {
          ...user._doc,
          profile_img_url: `${req.protocol}://${req.get("host")}/${user.profile_img}`,
          adhar_front_url: `${req.protocol}://${req.get("host")}/${user.adhar_front}`,
          adhar_back_url: `${req.protocol}://${req.get("host")}/${user.adhar_back}`,
          pan_img_url: `${req.protocol}://${req.get("host")}/${user.pan_img}`,
        };

        
        return res.status(200).json({
          success: true,
          message: "User details fetched successfully!",
          user: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      }
    });
  } catch (err) {
    console.error("getuser", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

exports.UpdateUserDetails = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed Token missing." });
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
        user.name = req.body.name || user.name;
        if (req.file) {
          user.profile_img = req.file.path;
        }
        await user.save();
        return res.status(200).json({
          success: true,
          message: "User details successfully updated!",
          user: user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
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

exports.logout = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const user = await User.findOne({ token: token });
    if (user) {
      user.token = null;
      await user.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "Logout successfully!" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllUsersDetails = async (req, res) => {
  try {
    const user = await User.find();

    const data = user.map((users) => ({
      ...users._doc,
      profile_img_url: `${req.protocol}://${req.get("host")}/${
        users.profile_img
      }`,
    }));

    return res.status(200).json({
      success: true,
      message: "All users detail fetched successfully!",
      data: data,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Deleting user with ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log("Error deleting user");
      return res
        .status(500)
        .json({ success: false, message: "Error deleting user" });
    }

    console.log("User deleted successfully:", deletedUser);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.KycUpload = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed. Token missing." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. Invalid token.",
        });
      }

      const { adhar_no, pan_no } = req.body;
      if (!adhar_no || !pan_no) {
        return res
          .status(400)
          .json({ success: false, message: "adhar_no and pan_no are required." });
      }

      // const user = new User({ adhar_no, pan_no });

      const user = await User.findOne({ email: decoded.email });
      if (user) {
        user.adhar_no = req.body.adhar_no;
        user.pan_no = req.body.pan_no;
      }

      const adharFrontFile = req.files["adhar_front"][0];
      const adharBackFile = req.files["adhar_back"][0];
      const panImgFile = req.files["pan_img"][0];

      if (!adharFrontFile || !adharBackFile || !panImgFile) {
        return res.status(400).json({
          success: false,
          message: "adhar_front, adhar_back, and pan_img files are required.",
        });
      }

      user.adhar_front = adharFrontFile.path;
      user.adhar_back = adharBackFile.path;
      user.pan_img = panImgFile.path;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "KYC details successfully updated!",
        user: user,
      });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getKycDetails = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed. Token missing." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. Invalid token.",
        });
      }

      const user = await User.findOne({ email: decoded.email });

      if (user) {
        return res.status(200).json({
          success: true,
          message: "Kyc details fetched successfully!",
          user: {
            _id: user._id,
            name: user.name,
            adhar_no: user.adhar_no,
            pan_no: user.pan_no,
            adhar_front: `${req.protocol}://${req.get("host")}/${
              user.adhar_front
            }`,
            adhar_back: `${req.protocol}://${req.get("host")}/${
              user.adhar_back
            }`,
            pan_img: `${req.protocol}://${req.get("host")}/${user.pan_img}`,
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
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
