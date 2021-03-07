const { AirPort } = require("../db/models");

exports.AirportList = async (req, res, next) => {
  try {
    const airPorts = await AirPort.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(airPorts);
  } catch (error) {
    next(error);
  }
};

exports.AirPortCreate = async (req, res, next) => {
  try {
    const newAirPort = await AirPort.create(req.body);
    res.status(201).json(newAirPort);
  } catch (error) {
    next(error);
  }
};
