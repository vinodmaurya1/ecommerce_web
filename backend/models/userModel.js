const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, minLength: 6, required: true },
    profile_img: String,
    phone: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          if (v.length === 10) return true;
          return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    token: String,
    wallet: { type: Number },
    adhar_no: { type: String },
    adhar_front: { type: String },
    adhar_back: { type: String},
    pan_no: { type: String},
    pan_img: { type: String},
  },
  { timestamps: true }
);


userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

exports.User = mongoose.model("users", userSchema);
