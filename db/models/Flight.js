const Flights = (sequelize, DataType) => {
  const Flight = sequelize.define(
    "Flight",
    {
      economySeats: { type: DataType.INTEGER },
      businessSeats: { type: DataType.INTEGER },
      price: { type: DataType.FLOAT },
      departureDate: {
        type: DataType.DATEONLY,
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
      departureTime: { type: DataType.TIME },
      arrivalTime: { type: DataType.TIME },
    },
    { timestamps: false }
  );
  return Flight;
};
module.exports = Flights;
