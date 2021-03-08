const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");
const Router = express.Router();
const { User } = require("../db/models/");
const {
  signup,
  signin,
  updateUser,
} = require("../controllers/userControllers");

// Router.param("userId", async (req, res, next, userId) => {
//   const foundUser = await fetchUser(userId, next);
//   if (foundUser) {
//     req.user = foundUser;
//     next();
//   } else {
//     const error = new Error("User Not Found");
//     error.status = 404;
//     next(error);
//   }
// });

//User Detail router
Router.put(
  "/user/:userId",
  // body("username").custom(async (value) => {
  //   try {
  //     console.log(req.user);

  //     const user = await User.findOne({ where: { username: value } });
  //     if (user) {
  //       return Promise.reject("Username already in use");
  //     }
  //   } catch (error) {
  //     console.log("UpdateUser router validator Error: ", error);
  //   }
  // }),
  // body("email").custom(async (value) => {
  //   try {
  //     const user = await User.findOne({ where: { email: value } });
  //     if (user) {
  //       return Promise.reject("Email already in use");
  //     }
  //   } catch (error) {
  //     console.log("UpdateUser router validator Error: ", error);
  //   }
  // }),
  // body("password")
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long"),
  updateUser
);

//User sign up
Router.post(
  "/signup",
  body("username").custom(async (value) => {
    try {
      const user = await User.findOne({ where: { username: value } });
      if (user) {
        return Promise.reject("Username already in use");
      }
    } catch (error) {
      console.log("Signup router validator Error: ", error);
    }
  }),
  body("email").custom(async (value) => {
    try {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject("Email already in use");
      }
    } catch (error) {
      console.log("Signup router validator Error: ", error);
    }
  }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  signup
);

//User sign in
Router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = Router;
