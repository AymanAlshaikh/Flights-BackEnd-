const {
  Airline,
  Flight,
  Booking,
  Passenger,
  FlightBooking,
} = require("../db/models");
const moment = require("moment");

exports.bookingFetch = async (bookingId, next) => {
  try {
    return (found = await Booking.findByPk(bookingId));
  } catch (error) {
    next(error);
  }
};

exports.bookingCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    const newBooking = await Booking.create({ userId: req.body.userId });

    const passengers = req.body.passengers.map((passenger) => ({
      ...passenger,
      bookingId: newBooking.id,
    }));

    const rokaab = await Passenger.bulkCreate(passengers);
    const hajz = await FlightBooking.create({
      bookingId: newBooking.id,
      flightId: req.body.flightId,
    });
    res.status(201).json(rokaab);
  } catch (error) {
    next(error);
  }
};

exports.passengerCreate = async (req, res, next) => {
  console.log(req.body);
  req.body.bookingId = req.booking.id;
  console.log(req.booking);
  try {
    const newPassenger = await Passenger.create(req.body);
    res.status(201).json(newPassenger);
  } catch (error) {
    next(error);
  }
};
