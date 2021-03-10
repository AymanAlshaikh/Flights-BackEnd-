const { Airport } = require("../db/models");

// REVIEW: Better naming: airportList, airportCreate
exports.AirportList = async (req, res, next) => {
  try {
    const airPorts = await Airport.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(airPorts);
  } catch (error) {
    next(error);
  }
};

exports.AirportCreate = async (req, res, next) => {
  try {
    const newAirport = await Airport.create(req.body);
    res.status(201).json(newAirport);
  } catch (error) {
    next(error);
  }
};
