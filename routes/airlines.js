const express = require("express");
const router = express.Router();

const {
  airlineList,
  airlineCreate,
} = require("../controllers/airlineControllers");

router.get("/", airlineList);
// Remove airline Create after completing testing
router.post("/add", airlineCreate);

module.exports = router;
