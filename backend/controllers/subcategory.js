const Subcategory = require("../models/subcategory");
const formidable = require("formidable");
const fs = require("fs");

exports.getSubcategoryById = (req, res, next, id) => {
  Subcategory.findById(id, (err, subcate) => {
    if (err) {
      return res.status(404).json({
        erorr: "Company Not Found!",
      });
    }
    req.subcategory = subcate;
    next();
  });
};

exports.addSubcategory = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtention = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Problem With Image!",
      });
    }

    //destructuring Fields
    const { name, category } = fields;

    if (!name || !category) {
      return res.status(400).json({
        error: "Please Include All Fields.",
      });
    }
    const subcategory = new Subcategory(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size Too Big!",
        });
      }
      subcategory.photo.data = fs.readFileSync(file.photo.path);
      subcategory.photo.contentType = file.photo.type;
    }
    subcategory.save((error, subcate) => {
      if (error) {
        return res.status(400).json({
          error: "Subcategory not created! Please Try Again",
        });
      }
      subcate.photo = undefined;
      return res.json(subcate);
    });
  });
};

exports.getSubcategoryImage = (req, res) => {
  if (req.subcategory.photo.data) {
    res.set("Content-Type", req.subcategory.photo.contentType);
    return res.send(req.subcategory.photo.data);
  }
};

exports.getAllSubcategory = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  Subcategory.find({})
    .sort([[sortBy, "asc"]])
    .select("-photo")
    .exec((err, subcate) => {
      if (err) {
        return res.status(400).json({
          error: "No Subcategory Found.",
        });
      }
      return res.json(subcate);
    });
};

exports.deleteSubcategory = (req, res) => {
  Subcategory.deleteOne({ _id: req.subcategory._id }, (err, result) => {
    if (err) {
      return res.json({
        error: "Unable to delete subcategory!",
      });
    }
    return res.json(result);
  });
};
