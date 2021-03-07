module.exports = (sequelize, DataTypes) => {
  const AirPort = sequelize.define("AirPort", {
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
  });
  return AirPort;
};
