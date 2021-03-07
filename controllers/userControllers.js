const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

// exports.userData = async (req, res) => {
//   const { userId } = req.params;
//   const users = User.find((user) => user.id === userId);
//   res.json(users);
// };

exports.signup = async (req, res, next) => {
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
