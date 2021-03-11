const express = require("express");
const router = express.Router();

const {
  airlineList,
  airlineCreate,
} = require("../controllers/airlineControllers");

//Airline list
router.get("/", airlineList);

//Airline add
router.post("/add", airlineCreate);

module.exports = router;
