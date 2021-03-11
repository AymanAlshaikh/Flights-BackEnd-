const express = require("express");
const Router = express.Router();

const { TierList, TierCreate } = require("../controllers/tierControllers");

//Tier list
Router.get("/", TierList);

//Tier add
Router.post("/add", TierCreate);

module.exports = Router;
