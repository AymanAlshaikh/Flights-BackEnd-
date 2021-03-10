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

// REVIEW: Airport is one word, it should be Airport not AirPort :p
