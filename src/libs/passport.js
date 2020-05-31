"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    function (username, password, done) {
      return userModel
        .findOne({ username })
        .then((data) => {
          if (!data)
            return done(err, false, {
              message: "Usuario no existe o contraseña incorrecta",
            });
          if (!bcrypt.compareSync(password, data.password))
            return done(null, false, {
              message: " Usuario no existe o contraseña incorrecta",
            });
          return done(null, data, { message: " Logueado correctamente" });
        })
        .catch((err) => {
          return done(err, false), { message: "Error en db" };
        });
    }
  )
);
let bearerExtractor = function (req) {
  let token = null;
  if (req && req.headers) {
    token = req.headers.authorization.split(" ")[1];
  }
  return token;
};
let opts = {};
opts.jwtFromRequest = bearerExtractor;
opts.secretOrKey = process.env.TOKENSECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    userModel
      .findById({ _id: jwt_payload.sub })
      .then((data) => {
        if (!data) return done(null, false);
        return done(null, data);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

// ##FACEBOOK##
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID_FB,
      clientSecret: process.env.SECRET_ID_FB,
      callbackURL: "http://localhost:4000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },

    function (accessToken, refreshToken, profile, done) {
      userModel.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user)
          userModel
            .create({
              facebookId: profile.id,
              name: profile.displayName,
              photo: profile.photos[0].value,
              email: profile.emails[0].value,
            })
            .then((userCreated) => {
              return done(null, userCreated);
            });
        if (user) return done(null, user);
      });
    }
  )
);

module.exports = passport;
