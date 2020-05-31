const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");
/* POST login. */
router.post("/login", authController.login);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["user_friends", "user_photos", "email"],
  })
);

router.get("/facebook/callback", authController.loginFacebook);

module.exports = router;
