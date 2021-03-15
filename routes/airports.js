const express = require("express");
const router = express.Router();

const {
  airportList,
  airportCreate,
} = require("../controllers/airportControllers");

router.get("/", airportList);
router.post("/add", airportCreate);

module.exports = router;
