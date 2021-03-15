const { Op } = require("sequelize");
const { Flight } = require("../db/models");
const moment = require("moment");

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

// exports.flightCreate = async (req, res, next) => {
//   try {
//     const newFlight = await Flight.create(req.body);

//     // arrival details
//     const arrivalDate = newFlight.arrivalDate;
//     const arrivalTime = newFlight.arrivalTime;
//     const fullarrivalDate = moment(arrivalDate + " " + arrivalTime).format();

//     // departure details
//     const departureDate = newFlight.departureDate;
//     const departureTime = newFlight.departureTime;
//     const fulldepartureDate = moment(
//       departureDate + " " + departureTime
//     ).format();

//     // Add half an hour to the flight
//     const addedHalf = moment(fullarrivalDate).add(0.5, "hours").format();

//     // start time and end time
//     const startTime = moment(fulldepartureDate);
//     const endTime = moment(fullarrivalDate);

//     // calculate total duration
//     const duration = moment.duration(endTime.diff(startTime));

//     // duration in hours
//     const hours = parseInt(duration.asHours());

//     // duration in minutes
//     const minutes = parseInt(duration.asMinutes()) % 60;

//     // add duration
//     const addHours = moment(addedHalf).add(hours, "hours").format();
//     const addMinutes = moment(addHours).add(minutes, "minutes").format();

//     // new Dates
//     const newFlightDepartureDate = moment(addedHalf).format("YYYY-MM-DD");
//     const newFlightDepartureTime = moment(addedHalf).format("HH:mm");
//     const newFlightArrivalDate = moment(addMinutes).format("YYYY-MM-DD");
//     const newFlightArrivalTime = moment(addMinutes).format("HH:mm");

//     const items = {
//       economySeats: newFlight.economySeats,
//       businessSeats: newFlight.businessSeats,
//       price: newFlight.price,
//       departureDate: newFlightDepartureDate,
//       departureTime: newFlightDepartureTime,
//       arrivalDate: newFlightArrivalDate,
//       arrivalTime: newFlightArrivalTime,
//       departureAirportId: newFlight.arrivalAirportId,
//       arrivalAirportId: newFlight.departureAirportId,
//       airlineId: newFlight.airlineId,
//     };
//     const roundtrip = await Flight.create(items);
//     res.status(201).json(roundtrip);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.flightUpdate = async (req, res, next) => {
//   try {
//     req.flight.update(req.body);
//     res.status(204).json(req.body);
//   } catch (error) {
//     next(error);
//   }
// };

exports.flightRemove = async (req, res, next) => {
  try {
    req.flight.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
