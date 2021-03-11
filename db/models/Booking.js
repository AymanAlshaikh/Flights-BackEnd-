module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Booking", {}, { timestamps: false });
};
