const { Op, QueryTypes } = require("sequelize");
const { Flight } = require("../db/models");
const moment = require("moment");
const sequelize = require("sequelize");

exports.flightFetch = async (flightId, next) => {
  try {
    return (found = await Flight.findByPk(flightId));
  } catch (error) {
    next(error);
  }
};

exports.flightList = async (req, res, next) => {
  try {
    // Adding 2 hours to the current time
    const add_minutes = (dt, minutes) => {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const timeNow = add_minutes(new Date(), 120).toLocaleTimeString("en-GB");

    const dateNow = Date.now();
    const today = new Date(dateNow);
    //Listing today's all Flights that are two hours ahead
    const flights = await Flight.findAll({
      where: {
        // This was so confusing, don't try this at home
        [Op.or]: [
          {
            [Op.and]: [
              {
                departureTime: {
                  [Op.gt]: timeNow,
                },
                departureDate: {
                  [Op.eq]: today,
                },
              },
            ],
          },
          {
            departureDate: {
              [Op.gt]: today,
            },
          },
        ],
      },
    });
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};



exports.flightSearch = async (req, res, next) => {
  try {
    // Adding 2 hours to the current time
    const add_minutes = (dt, minutes) => {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const timeNow = add_minutes(new Date(), 120).toLocaleTimeString("en-GB");

    const dateNow = Date.now();
    const today = new Date(dateNow);
    //Listing today's all Flights that are two hours ahead
    const seat = req.body.seat;
    if (seat === "Economy") {
      ("Economy");
    } else {
      ("Business");
    }
    const flights = await Flight.findAll({
      where: {
        [Op.and]: [
          {
            departureDate: {
              [Op.or]: [
                { [Op.eq]: req.body.departureDate },
                { [Op.gt]: req.body.departureDate },
              ],
            },
          },

          {
            departureAirportId: {
              [Op.eq]: req.body.departureAirportId,
            },
          },
          {
            arrivalAirportId: {
              [Op.eq]: req.body.arrivalAirportId,
            },
          },

          {
            [Op.or]: [
              {
                economySeats: {
                  [Op.or]: [
                    { [Op.eq]: req.body.economySeats },
                    { [Op.gt]: req.body.economySeats },
                  ],
                },
              },

              {
                businessSeats: {
                  [Op.or]: [
                    { [Op.eq]: req.body.businessSeats },
                    { [Op.gt]: req.body.businessSeats },
                  ],
                },
              },
            ],
          },
        ],
      },
    });
    res.status(200).json(flights);
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
