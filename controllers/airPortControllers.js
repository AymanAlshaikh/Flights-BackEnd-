const { Airport } = require("../db/models");

exports.airportList = async (req, res, next) => {
  try {
    const airports = await Airport.findAll({});
    res.status(200).json(airports);
  } catch (error) {
    next(error);
  }
};

//Review: remove after finishing
exports.airportCreate = async (req, res, next) => {
  try {
    const newAirport = await Airport.create(req.body);
    res.status(201).json(newAirport);
  } catch (error) {
    next(error);
  }
};
