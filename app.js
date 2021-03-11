const express = require("express");
const cors = require("cors");
const passport = require("passport");
const db = require("./db/models");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Routes imports
const userRoutes = require("./routes/users");
const flightRoutes = require("./routes/flights");
const airportRoutes = require("./routes/airports");
const airlineRoutes = require("./routes/airlines");
const tierRoutes = require("./routes/tiers");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use(userRoutes);
app.use("/flights", flightRoutes);
app.use("/airports", airportRoutes);
app.use("/airlines", airlineRoutes);
app.use("/tiers", tierRoutes);

//Handle 404
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Server Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
