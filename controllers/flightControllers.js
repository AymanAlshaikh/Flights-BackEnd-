const { Flight } = require("../db/models");
const { Op } = require("sequelize");

exports.flightList = async (req, res, next) => {
  try {
    // Adding 2 hours to the current time
    const add_minutes = function (dt, minutes) {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const timeNow = add_minutes(new Date(), 120).toLocaleTimeString("en-GB");

    const dateNow = Date.now();
    const today = new Date(dateNow);
    //Listing today's all Flights that are two hours ahead
    const flights = await Flight.findAll({
      where: {
        departureDate: {
          [Op.or]: {
            [Op.eq]: today,
            [Op.gt]: today,
          },
        },
        departureTime: { [Op.gt]: timeNow },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
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

// REVIEW: Better naming: flightRemove, flightUpdate
// REVIEW: Use router.params to find the flight

exports.removeFlight = async (req, res, next) => {
  const { flightId } = req.params;
  try {
    const found = await Flight.findByPk(flightId);
    if (found) {
      found.destroy();
      res.status(204).end();
    } else {
      res.json("flight does not exist"); // Add 404 status
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
