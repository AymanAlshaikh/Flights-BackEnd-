const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  airlineList,
  airlineCreate,
  flightCreate,
  airlineFetch,
  flightUpdate,
} = require("../controllers/airlineControllers");

const { flightFetch } = require("../controllers/flightControllers");

//flight fetch
router.param("flightId", async (req, res, next, flightId) => {
  const flight = await flightFetch(flightId, next);
  if (flight) {
    req.flight = flight;
    next();
  } else {
    next({ status: 404, message: "flight not found" });
  }
});

//airline fetch
router.param("airlineId", async (req, res, next, airlineId) => {
  const airline = await airlineFetch(airlineId, next);
  if (airline) {
    req.airline = airline;
    next();
  } else {
    next({ status: 404, message: "airline not found" });
  }
});

router.get("/", airlineList);
// Review: Remove airline Create after completing testing
router.post("/", airlineCreate);

router.post(
  "/:airlineId/flights",
  passport.authenticate("jwt", { session: false }),
  flightCreate
);

router.put(
  "/:airlineId/flights/:flightId",
  passport.authenticate("jwt", { session: false }),
  flightUpdate
);

module.exports = router;
