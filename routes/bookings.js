const express = require("express");
const passport = require("passport");
const {
  bookingCreate,
  passengerCreate,
  bookingFetch,
} = require("../controllers/bookingControllers");
const router = express.Router();

//booking fetch
router.param("bookingId", async (req, res, next, bookingId) => {
  const booking = await bookingFetch(bookingId, next);
  if (booking) {
    req.booking = booking;
    next();
  } else {
    next({ status: 404, message: "booking not found" });
  }
});

router.post("/booking", bookingCreate);

router.post("/booking/:bookingId", passengerCreate);

module.exports = router;
