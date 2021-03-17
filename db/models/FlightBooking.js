module.exports = (sequelize, DataTypes) => {
  return sequelize.define("FlightBooking", {}, { timestamps: false });
};
