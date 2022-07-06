const mongoose = require("mongoose");
const uuid = require("uuid");
const { ObjectId } = mongoose.Schema;
const crypto = require("crypto");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 40,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    email: {
      type: String,
      required: true,
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
      default: false,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

companySchema.methods = {
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

companySchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (plainpassword) {
    this._password = plainpassword;
    this.salt = uuid.v4();
    this.encrypted_password = this.securePassword(plainpassword);
  });

module.exports = mongoose.model("Company", companySchema);
