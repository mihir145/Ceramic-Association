const express = require("express");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryById } = require("../controllers/category");
const {
  companySignin,
  companySignup,
  getCompanyImage,
  getCompanyById,
  updateCompany,
  updateCompanyStatus,
  getCompanies,
  companyLogout,
  searchCompanies,
} = require("../controllers/company");
const router = express.Router();

router.param("companyId", getCompanyById);
router.param("categoryId", getCategoryById);

router.post("/company/signin", companySignin);

router.post("/company/signup", companySignup);

router.put("/company/update/:companyId", updateCompany);

router.get("/company/logout", companyLogout);

router.get("/company/profile-picture/:companyId", getCompanyImage);

router.get("/companies", getCompanies);

router.get("/search/companies", searchCompanies);

router.get("/company/:companyId", (req, res) => {
  // req.company.encrypted_password = undefined;
  // req.company.salt = undefined;
  // req.company.photo = undefined;
  res.json(req.company);
});

module.exports = router;
