
const { Flight, User } = require("../db/models");
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

      // where: { departureTime: this.departureTime > Date.now() + 7200000 },

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

// REVIEW: Better naming: flightRemove, flightUpdate (done)
// REVIEW: Use router.params to find the flight (done)

exports.flightFetch = async (flightId, next) => {
  try {
    return (found = await Flight.findByPk(flightId));
  } catch (error) {
    next(error);
  }
};

exports.flightRemove = async (req, res, next) => {
  try {
    req.flight.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.flightUpdate = async (req, res, next) => {
  try {
    req.flight.update(req.body);
    res.status(204).json(req.body);
  } catch (error) {
    next(error);
  }
};
