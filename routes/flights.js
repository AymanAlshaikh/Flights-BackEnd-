const express = require("express");
const router = express.Router();

const {
  flightList,
  flightCreate,
  flightRemove,
  flightUpdate,
  flightFetch,
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

//flight add
router.post("/", flightCreate);

//flight delete
router.delete("/:flightId", flightRemove);

//flight update
router.put("/:flightId", flightUpdate);

module.exports = router;
