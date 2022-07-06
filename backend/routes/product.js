const router = require("express").Router();
const {
  isSignedin,
  isCompany,
  isAuthenticated,
} = require("../controllers/auth");
const { getCompanyById } = require("../controllers/company");
const {
  getProductById,
  addProduct,
  getProducts,
  getProudctImage,
} = require("../controllers/product");
const Product = require("../models/product");

router.param("productId", getProductById);
router.param("companyId", getCompanyById);

router.post(
  "/product/add/:companyId",
  isSignedin,
  isAuthenticated,
  isCompany,
  addProduct
);

router.get("/product/get-all/:companyId", getProducts);

router.get("/product/image/:productId", getProudctImage);

module.exports = router;
