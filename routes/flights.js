const express = require("express");
const Router = express.Router();
// REVIEW: Better naming: router not Router
const {
  flightList,
  flightCreate,
  removeFlight,
  updateFlight,
} = require("../controllers/flightControllers");

//flight list
Router.get("/", flightList);

//flight add
Router.post("/", flightCreate);

//flight delete
Router.delete("/:flightId", removeFlight);

//flight update
Router.put("/:flightId", updateFlight);

module.exports = Router;
