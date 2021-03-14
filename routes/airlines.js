const express = require("express");
const router = express.Router();

const {
  airlineList,
  airlineCreate,
} = require("../controllers/airlineControllers");

router.get("/", airlineList);
// Remove airline Create after completing testing
router.post("/", airlineCreate);

module.exports = router;
