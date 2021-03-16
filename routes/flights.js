const express = require("express");
const router = express.Router();

const {
  flightList,
  flightRemove,
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

router.get("/", flightList);
router.post("/search", flightSearch);
router.delete("/:flightId", flightRemove);

module.exports = router;
