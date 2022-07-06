var router = require("express").Router();
const { check } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email", "Email Is Required!").isEmail(),
    check("name", "Username Should be Minimum 3 Characters!").isLength({
      min: 3,
    }),
    check("password", "Password Should be Minimum 6 Characters!").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [check("email", "Email Is Required!").isEmail()],
  signin
);

router.get("/signout", signout);

module.exports = router;
