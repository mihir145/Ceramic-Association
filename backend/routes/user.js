const express = require("express");
const {
  getUser,
  getUserById,
  updateUser,
  getUsers,
} = require("../controllers/user");
const router = express.Router();
const { isAuthenticated, isSignedin, isAdmin } = require("../controllers/auth");
const {
  getCompanyById,
  updateCompanyStatus,
} = require("../controllers/company");

router.param("userId", getUserById);
router.param("companyId", getCompanyById);

router.get("/user/:userId", isSignedin, isAuthenticated, getUser);

router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);

router.put(
  "/company/update-status/:userId/:companyId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateCompanyStatus
);

router.get("/users", getUsers);
module.exports = router;
