const expJwt = require("express-jwt");
const { validationResult, check } = require("express-validator");
const jsonWebToken = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res) => {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error:
          "Something Went Wrong.. Try Again or May be user is exists try with different Email!",
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  var errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (!user || err) {
      return res.status(400).json({
        error: "User Does Not Exists!",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password Does Not Match!",
      });
    }
    const token = jsonWebToken.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, email, name, role, address, phone } = user;

    return res.json({
      token,
      user: { _id, email, name, role, address, phone },
    });
  });
};

exports.isSignedin = expJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// exports.isSignedin = (req, res, next) => {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.headers["authorization"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   next();
// };

exports.isAuthenticated = (req, res, next) => {
  let checker =
    (req.company && req.auth && req.company._id == req.auth._id) ||
    (req.profile && req.auth && req.profile._id == req.auth._id);
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== "admin") {
    return res.status(403).json({
      error: "You Are Not Admin, Access Denied!",
    });
  }
  next();
};

exports.isCompany = (req, res, next) => {
  if (typeof req.company !== "undefined" && !req.company.isActive) {
    return res.status(403).json({
      error: "You are not authorized company, Access Denied!",
    });
  }
  next();
};

exports.signout = (req, res) => {
  res.clearCookie("token");
};
