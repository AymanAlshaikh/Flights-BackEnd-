"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.belongsTo(db.Tier, { as: "tier" });
db.Tier.hasMany(db.User, { as: "users", foreignKey: "tierId" });

// db.Flight.belongsTo(db.Airport, { as: "airport" });
db.Airport.hasMany(db.Flight, {
  as: "departureFlights",
  foreignKey: "departureAirportId",
});
db.Airport.hasMany(db.Flight, {
  as: "arrivalFlights",
  foreignKey: "arrivalAirportId",
});

db.Airline.hasMany(db.Flight, { as: "flights", foreignKey: "airlineId" });
db.Flight.belongsTo(db.Airline, { as: "airline" });

db.User.hasOne(db.Airline, { as: "airline", foreignKey: "userId" });
db.Airline.belongsTo(db.User, { as: "user" });

db.User.belongsToMany(db.Flight, {
  through: db.Booking,
  foreignKey: "userId",
});
db.Flight.belongsToMany(db.User, {
  through: db.Booking,
  foreignKey: "flightId",
});

module.exports = db;
