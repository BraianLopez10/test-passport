"use strict";
const express = require("express");
require("./db");
const app = express();
const passport = require("passport");
require("./libs/passport");
const bodyparser = require("body-parser");
const path = require("path");
const middlewares = require("./middleware");
const routeAuth = require("./routes/auth");
const routeUser = require("./routes/user");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/user/profile", middlewares.ensureAuthenticated, (req, res) => {
  res.render("profile");
});

app.use("/api/auth", routeAuth);
app.use("/api", routeUser);

module.exports = app;
