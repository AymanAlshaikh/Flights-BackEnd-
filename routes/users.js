const express = require("express");
const passport = require("passport");
const Router = express.Router();

// const { signup, UserList, signin } = require(""); //DON'T FOR GET TO IMPORT THE CONTROLLERS
const { signup } = require("../controllers/userControllers");

//User List router
// Router.get("/", UserList);
//User sign up
Router.post("/signup", signup);
//User sign in
// Router.post(
//   "/signin",
//   passport.authenticate("local", { session: false }),
//   signin
// );

module.exports = Router;
