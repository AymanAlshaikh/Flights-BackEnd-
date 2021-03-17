const { Airline, Flight } = require("../db/models");
const moment = require("moment");

exports.airlineFetch = async (airlineId, next) => {
  try {
    return (found = await Airline.findByPk(airlineId));
  } catch (error) {
    next(error);
  }
};

exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Airline.findAll();
    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

// Review: Remove airline Create after completing testing
exports.airlineCreate = async (req, res, next) => {
  try {
    const newAirline = await Airline.create(req.body);
    res.status(201).json(newAirline);
  } catch (error) {
    next(error);
  }
};

exports.flightCreate = async (req, res, next) => {
  // Review: Add trycatch if needed
  // try {
  if (req.user.id === req.airline.userId) {
    const newFlight = await Flight.create(req.body);

    // Review: move all the moment process to a function
    // arrival details
    const arrivalDate = newFlight.arrivalDate;
    const arrivalTime = newFlight.arrivalTime;
    const fullarrivalDate = moment(arrivalDate + " " + arrivalTime).format();

    // departure details
    const departureDate = newFlight.departureDate;
    const departureTime = newFlight.departureTime;
    const fulldepartureDate = moment(
      departureDate + " " + departureTime
    ).format();

    // Add half an hour to the flight
    const addedHalf = moment(fullarrivalDate).add(0.5, "hours").format();

    // start time and end time
    const startTime = moment(fulldepartureDate);
    const endTime = moment(fullarrivalDate);

    // calculate total duration
    const duration = moment.duration(endTime.diff(startTime));

    // duration in hours
    const hours = parseInt(duration.asHours());

    // duration in minutes
    const minutes = parseInt(duration.asMinutes()) % 60;

    // add duration
    const addHours = moment(addedHalf).add(hours, "hours").format();
    const addMinutes = moment(addHours).add(minutes, "minutes").format();

    // new Dates
    const newFlightDepartureDate = moment(addedHalf).format("YYYY-MM-DD");
    const newFlightDepartureTime = moment(addedHalf).format("HH:mm");
    const newFlightArrivalDate = moment(addMinutes).format("YYYY-MM-DD");
    const newFlightArrivalTime = moment(addMinutes).format("HH:mm");

    const items = {
      economySeats: newFlight.economySeats,
      businessSeats: newFlight.businessSeats,
      price: newFlight.price,
      departureDate: newFlightDepartureDate,
      departureTime: newFlightDepartureTime,
      arrivalDate: newFlightArrivalDate,
      arrivalTime: newFlightArrivalTime,
      departureAirportId: newFlight.arrivalAirportId,
      arrivalAirportId: newFlight.departureAirportId,
      airlineId: newFlight.airlineId,
    };
    const roundtrip = await Flight.create(items);
    res.status(201).json(roundtrip);
  } else {
    const error = new Error("not your airline");
    error.status = 401;
    next(error);
  }
  // } catch (error) {
  // next(error);
  // }
};

exports.flightUpdate = async (req, res, next) => {
  // Review: add trycatch if needed
  // try {
  if (req.user.id === req.airline.userId) {
    await req.flight.update(req.body);
    res.status(204).json(req.body);
  } else {
    const error = new Error("not your flight");
    error.status = 401;
    next(error);
  }
  // } catch (error) {
  //   next(error);
  // }
};
