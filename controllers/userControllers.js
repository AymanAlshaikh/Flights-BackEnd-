const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { body, validationResult } = require("express-validator");

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    const foundUser = await User.findByPk(userId);

    if (foundUser) {
      console.log(req.body);
      const hashedPassowrd = await bcrypt.hash(password, 10);
      req.body.password = hashedPassowrd;
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
  body("password").isLength({ min: 8 }),
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    };
  const { password } = req.body;
  try {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    req.body.password = hashedPassowrd;
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    res.status(201);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
