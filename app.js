const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const userRoutes = require("./routes/users");
const flightRoutes = require("./routes/flights");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use("/flights", flightRoutes);
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Error handler
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

const PORT = 8000;

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
