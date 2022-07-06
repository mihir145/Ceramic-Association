const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "No User Found.",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  return res.json(req.profile);
};

exports.getUsers = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  User.find({ role: "user" })
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .select("-encrypted_password -salt")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "No Users Found.",
        });
      }
      return res.json(user);
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You Are Not Authorized To Update This User.",
        });
      }
      user.encrypted_password = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};
