const Flights = (sequelize, DataType) => {
  const Flight = sequelize.define(
    "Flight",
    {
      economySeats: { type: DataType.INTEGER },
      businessSeats: { type: DataType.INTEGER },
      Airline: { type: DataType.STRING }, // REVIEW: what's this?
      price: { type: DataType.FLOAT },
      departureDate: {
        type: DataType.DATEONLY,
        // allowNull: false,
        validate: {
          DateValidate(value) {
            if (this.arrivalDate < value) {
              throw new Error("Arrival date cannot be before Departure date");
            }
          },
        },
      },
      arrivalDate: {
        type: DataType.DATEONLY,
        validate: {
          DateValidate(value) {
            if (this.departureDate > value) {
              throw new Error("Departure date cannot be before Arrival date");
            }
          },
        },
      },
      departureTime: { type: DataType.DATE },
      arrivalTime: { type: DataType.DATE },
      departureAirport: { type: DataType.STRING },
      arrivalAirport: { type: DataType.STRING },
    },
    { timestamps: false }
  );
  return Flight;
};
module.exports = Flights;
