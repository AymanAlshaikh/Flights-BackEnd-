const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { validationResult } = require("express-validator");

exports.updateUser = async (req, res, next) => {
  //Hnadle if the the username and email are used already
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // REVIEW: You should get the user ID from the token, ma y9eer you pass it bil body!

  //if the username and email ar not used before
  const userId = req.body.id;
  try {
    const foundUser = await User.findByPk(userId);

    if (foundUser) {
      await foundUser.update(req.body);

      res.status(204).json(req.body);
    } else {
      res.status(404).json("user does not exist");
    }
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  //Hnadle if the the username and email are used already
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //if the username and email ar not used before
  const { password } = req.body;
  try {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    req.body.password = hashedPassowrd;
    // if (User.isAirline) {
    const newUser = await User.create(req.body);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isAirline: user.isAirline,
      exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    console.log(payload);
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    res.status(201).json({ token });
    // } else res.json("U R not an airline");
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { user } = req;
    // REVIEW: The token here is different than the signup token. Why?
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isAirline: user.isAirline,
      exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
