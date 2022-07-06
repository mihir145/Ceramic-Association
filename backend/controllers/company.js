const Company = require("../models/company");
const formidable = require("formidable");
const fs = require("fs");
const expJwt = require("express-jwt");
const { validationResult, check } = require("express-validator");
const jsonWebToken = require("jsonwebtoken");

exports.getCompanyById = (req, res, next, id) => {
  Company.findById(id, (err, comp) => {
    if (err) {
      return res.status(404).json({
        erorr: "Company Not Found!",
      });
    }
    req.company = comp;
    next();
  }).populate("category");
};

exports.companySignup = (req, res) => {
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
    const { name, email, phone, password, category, address } = fields;

    if (!name || !email || !password || !category || !address || !phone) {
      return res.status(400).json({
        error: "Please Include All Fields.",
      });
    }
    const company = new Company(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size Too Big!",
        });
      }

      company.photo.data = fs.readFileSync(file.photo.path);
      company.photo.contentType = file.photo.type;
    }
    company.save((err, comp) => {
      if (err) {
        return res.status(400).json({
          error: "Company not registered! Please Try Again",
          err: err,
        });
      }
      comp.photo = undefined;
      return res.json(comp);
    });
  });
};

exports.companySignin = (req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  Company.findOne({ email: req.body.email }, (err, company) => {
    if (!company || err) {
      return res.status(400).json({
        error: "Company Does Not Exists!",
        email: req.body.email,
        password: req.body.password,
      });
    }
    if (!company.authenticate(req.body.password)) {
      return res.status(400).json({
        error: "Email and Password Does Not Match!",
      });
    }
    const token = jsonWebToken.sign({ _id: company._id }, process.env.SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, { expire: new Date() + 2 });

    company.encrypted_password = undefined;
    company.salt = undefined;
    company.photo = company.photo ? undefined : null;

    return res.json({ token, company });
  });
};

exports.getCompanyImage = (req, res) => {
  if (req.company.photo.data) {
    res.set("Content-Type", req.company.photo.contentType);
    return res.send(req.company.photo.data);
  }
};

exports.updateCompany = (req, res) => {
  Company.findByIdAndUpdate(
    { _id: req.company._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, comp) => {
      if (err) {
        return res.status(400).json({
          error: "You Are Not Authorized To Update The status.",
        });
      }
      return res.json({
        message: "Status Updated!",
      });
    }
  );
};

exports.updateCompanyStatus = (req, res) => {
  Company.findByIdAndUpdate(
    { _id: req.company._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, comp) => {
      if (err) {
        return res.status(400).json({
          error: "You Are Not Authorized To Update The status.",
        });
      }
      return res.json({
        message: "Status Updated!",
      });
    }
  );
};

exports.getCompanies = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  Company.find({})
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .select("-photo")
    .populate("category")
    .exec((err, comp) => {
      if (err) {
        return res.status(400).json({
          error: "No Company Found.",
        });
      }
      return res.json(comp);
    });
};

exports.companyLogout = (req, res) => {
  res.clearCookie("token");
};

exports.searchCompanies = (req, res) => {
  const searchKeyword = req.query.searchKeyword ? req.query.searchKeyword : "";
  Company.find({
    $and: [{ name: { $regex: `${searchKeyword}`, $options: "i" } }],
  }).exec((err, companies) => {
    if (err) {
      return res.json({
        error: "Unable to fetch Companies!",
      });
    }

    return res.json(companies);
  });
};
