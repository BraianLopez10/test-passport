"use strict";
const passport = require("passport");

let middlewares = {
  ensureAuthenticated: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (info) {
        return res.status(500).json({ message: info });
      }
      if (err) return res.status(500).json({ message: err });
      if (!user) return res.status(500).json({ message: "User no existe" });
      req.user = user;
      next();
    })(req, res, next);
  },
};

module.exports = middlewares;
