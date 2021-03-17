module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Passenger",
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      passportNumber: { type: DataTypes.INTEGER },
    },
    { timestamps: false }
  );
};
