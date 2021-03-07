const express = require("express");
const Router = express.Router();

const {
  AirportList,
  AirPortCreate,
} = require("../controllers/airPortControllers");
//AirPort list
Router.get("/", AirportList);
//AirPort add
Router.post("/add", AirPortCreate);

module.exports = Router;
