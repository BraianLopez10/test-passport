const Router = require("express").Router();
const userController = require("../controllers/user");

Router.post("/register", userController.create);

module.exports = Router;
