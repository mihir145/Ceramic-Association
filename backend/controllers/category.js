require("dotenv").config();
const Category = require("../models/category");
const fs = require("fs");
const formidable = require("formidable");
const { result } = require("lodash");

exports.createCategory = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtention = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Problem With Image!",
        msg: err,
      });
    }

    // res.json({ error: { file, fields } });
    //destructuring Fields
    const { name } = fields;

    if (!name) {
      return res.status(400).json({
        error: "Please Include All Fields.",
      });
    }
    const category = new Category(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size Too Big!",
        });
      }

      category.photo.data = fs.readFileSync(file.photo.path);
      category.photo.contentType = file.photo.type;
    }
    category.save((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not created! Please Try Again",
        });
      }
      return res.json(cate);
    });
  });
};

exports.getCategoryImage = (req, res) => {
  if (req.category.photo.data) {
    res.set("Content-Type", req.category.photo.contentType);
    return res.send(req.category.photo.data);
  }
};

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "No User Found.",
      });
    }
    req.category = cate;
    next();
  });
};

exports.getCategory = (req, res) => {
  req.category.photo = undefined;
  return res.status(200).json(req.category);
};

exports.getAllCategory = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  Category.find({})
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .select("-photo")
    .exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "No Category Found.",
        });
      }
      return res.json(cate);
    });
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "You Are Not Authorized To Update This Category!",
        });
      }
      return res.json({
        message: cate.name + " is Successfully Updated!",
      });
    }
  );
};

//TODO : Delete Category
exports.deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.category._id }, (err, result) => {
    if (err) {
      return res.json({
        error: "Unable to delete category!",
      });
    }
    return res.json(result);
  });
  // Category.deleteOne({ _id: req.category._id });
};
