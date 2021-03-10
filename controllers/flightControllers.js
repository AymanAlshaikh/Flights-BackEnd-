const { Flight, User } = require("../db/models");
const { Op } = require("sequelize");
const moment = require("moment");

// const time =
//   User.departureTime.getHours() * 360000 +
//   User.departureTime.getMinutes() * 60000 +
//   User.departureTime.getSeconds() * 1000;
exports.flightList = async (req, res, next) => {
  try {
    const timeNow = new Date().toLocaleTimeString("en-GB");
    const flights = await Flight.findAll({
      where: {
        departureTime: { [Op.gt]: timeNow },
        // departureDate: {[Op.gt]: }
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log(timeNow);
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};

exports.flightCreate = async (req, res, next) => {
  try {
    const newFlight = await Flight.create(req.body);
    res.status(201).json(newFlight);
  } catch (error) {
    next(error);
  }
};

exports.removeFlight = async (req, res, next) => {
  const { flightId } = req.params;
  try {
    const found = await Flight.findByPk(flightId);
    if (found) {
      found.destroy();
      res.status(204).end();
    } else {
      res.json("flight does not exist");
    }
  } catch (error) {
    next(error);
  }
};

exports.updateFlight = async (req, res, next) => {
  const { flightId } = req.params;
  try {
    const found = await Flight.findByPk(flightId);
    if (found) {
      found.update(req.body);
      res.status(204).json(req.body);
    } else {
      res.json("flight does not exist");
    }
  } catch (error) {
    next(error);
  }
};
