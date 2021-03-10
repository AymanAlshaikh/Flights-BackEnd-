const { Flight, User } = require("../db/models");

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      // where: { departureTime: this.departureTime > Date.now() + 7200000 },
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
