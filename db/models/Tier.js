module.exports = (sequelize, DataTypes) => {
  const Tier = sequelize.define("Tier", {
    name: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
    },
  });
  return Tier;
};
