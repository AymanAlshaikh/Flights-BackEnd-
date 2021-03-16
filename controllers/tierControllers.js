const { Tier } = require("../db/models");

exports.TierList = async (req, res, next) => {
  try {
    const tiers = await Tier.findAll();
    res.status(200).json(tiers);
  } catch (error) {
    next(error);
  }
};
// Review: remove after finishing
exports.TierCreate = async (req, res, next) => {
  try {
    const newTier = await Tier.create(req.body);
    res.status(201).json(newTier);
  } catch (error) {
    next(error);
  }
};
