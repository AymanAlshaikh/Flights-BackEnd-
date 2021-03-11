const { Airline } = require("../db/models");

exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Airline.findAll();
    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

exports.airlineCreate = async (req, res, next) => {
  try {
    const newAirline = await Airline.create(req.body);
    res.status(201).json(newAirline);
  } catch (error) {
    next(error);
  }
};
