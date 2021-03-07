const express = require("express");

const app = express();

app.use(passport.initialize());

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
// db.sequelize.sync({ alter: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
