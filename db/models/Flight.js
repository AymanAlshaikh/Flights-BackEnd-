const Flights = (sequelize, DataType) => {
  const Flight = sequelize.define(
    "Flight",
    {
      Airline: { type: DataType.STRING },
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
      departureTime: { type: DataType.STRING },
      arrivalTime: { type: DataType.STRING },
      departureAirport: { type: DataType.STRING },
      arrivalAirport: { type: DataType.STRING },
    },
    { timestamps: false }
  );
  return Flight;
};
module.exports = Flights;