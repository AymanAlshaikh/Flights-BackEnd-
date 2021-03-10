const express = require("express");
const router = express.Router();

const {
  AirportList,
  AirportCreate,
} = require("../controllers/airPortControllers");
//Airport list
router.get("/", AirportList);
//Airport add
router.post("/add", AirportCreate);

module.exports = router;
