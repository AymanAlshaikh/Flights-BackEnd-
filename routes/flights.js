const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  flightList,
  flightCreate,
  flightRemove,
  flightUpdate,
  flightFetch,
  flightSearch,
} = require("../controllers/flightControllers");

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

//flight list
router.get("/", flightList);

//flight list
router.get("/search", flightSearch);

//flight add
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  flightCreate
);

//flight delete
router.delete("/:flightId", flightRemove);

//flight update
router.put("/:flightId", flightUpdate);

module.exports = router;
