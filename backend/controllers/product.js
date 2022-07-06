const expressValidator = require("express-validator");
const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id, (err, product) => {
    if (err) {
      return res.status(404).json({
        erorr: "Product Not Found!",
      });
    }
    req.product = product;
    next();
  });
};

exports.addProduct = (req, res) => {
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

    //destructuring Fields
    const { name, description, price, size, company } = fields;

    if (!name || !price || !description || !size || !company) {
      return res.status(400).json({
        error: "Please Include All Fields.",
      });
    }
    const product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size Too Big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "Product not created! Please Try Again",
          err: err,
        });
      }
      prod.photo = undefined;
      return res.json(prod);
    });
  });
};

exports.getProducts = (req, res) => {
  const companyId = req.params.companyId;
  const searchKeyword = req.query.searchKeyword ? req.query.searchKeyword : "";
  Product.find({
    $and: [
      { company: companyId },
      { name: { $regex: `${searchKeyword}`, $options: "i" } },
    ],
  }).exec((err, products) => {
    if (err) {
      return res.json({
        error: "Unable to fetch products!",
      });
    }

    return res.json(products);
  });
};

exports.getProudctImage = (req, res) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};
