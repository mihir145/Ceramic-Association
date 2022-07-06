const router = require("express").Router();
const {
  addSubcategory,
  getAllSubcategory,
  getSubcategoryById,
  getSubcategoryImage,
  deleteSubcategory,
} = require("../controllers/subcategory");
const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("subcategoryId", getSubcategoryById);

router.get("/subcategory/image/:subcategoryId", getSubcategoryImage);

router.post(
  "/subcategory/add/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  addSubcategory
);

router.get("/subcategories", getAllSubcategory);

router.delete("/subcategory/:userId/:subcategoryId", deleteSubcategory);

module.exports = router;
