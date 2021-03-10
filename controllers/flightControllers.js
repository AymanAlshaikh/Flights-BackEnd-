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
