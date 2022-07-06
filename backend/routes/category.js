const express = require("express");
const {
  createCategory,
  getCategoryById,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryImage,
} = require("../controllers/category");
const router = express.Router();
const { isAuthenticated, isSignedin, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

// router.get("/category/:categoryId", getCategory);

router.get("/category/:categoryId", getCategoryImage);

router.post(
  "/category/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.put(
  "/category/:userId/:categoryId",
  isSignedin,
  isAuthenticated,
  updateCategory
);

router.delete(
  "/category/:userId/:categoryId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

router.get("/get-category/:categoryId", getCategory);

router.get("/categories", getAllCategory);

module.exports = router;
