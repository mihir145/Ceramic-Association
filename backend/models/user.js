const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 40,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    salt: String,
    encrypted_password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    photo_url: String,
  },
  { timestamps: true }
);

userSchema.methods = {
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha512", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },
};

userSchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (plainpassword) {
    this._password = plainpassword;
    this.salt = uuid.v4();
    this.encrypted_password = this.securePassword(plainpassword);
  });

module.exports = mongoose.model("User", userSchema);
