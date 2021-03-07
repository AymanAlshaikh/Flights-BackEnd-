const { Tier } = require("../db/models");

exports.TierList = async (req, res, next) => {
  try {
    const tiers = await Tier.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(tiers);
  } catch (error) {
    next(error);
  }
};

exports.TierCreate = async (req, res, next) => {
  try {
    const newTier = await Tier.create(req.body);
    res.status(201).json(newTier);
  } catch (error) {
    next(error);
  }
};
