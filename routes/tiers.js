const express = require("express");
const Router = express.Router();

const { TierList, TierCreate } = require("../controllers/tierControllers");

Router.get("/", TierList);
Router.post("/add", TierCreate);

module.exports = Router;
