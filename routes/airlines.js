const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  airlineList,
  airlineCreate,
} = require("../controllers/airlineControllers");
const { flightCreate } = require("../controllers/flightControllers");

router.get("/", airlineList);
// Remove airline Create after completing testing
router.post("/", airlineCreate);

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   flightCreate
// );
module.exports = router;
