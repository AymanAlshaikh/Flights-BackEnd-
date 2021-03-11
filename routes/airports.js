const express = require("express");
const router = express.Router();

const {
  airportList,
  airportCreate,
} = require("../controllers/airportControllers");

//Airport list
router.get("/", airportList);

//Airport add
router.post("/add", airportCreate);

module.exports = router;
