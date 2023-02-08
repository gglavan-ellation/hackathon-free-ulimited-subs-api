const { StatusCodes } = require("http-status-codes");

const logger = require("../utils/logger");
const ReferralModel = require("../models/referral");
const { getSubscriptionReward } = require("../helpers/subscription");

const createReferral = async (req, res) => {
  const { username, code } = req.body;

  try {
    const referral = await ReferralModel.create({ code: username });

    if (code) {
      referral.coins += 1;
      referral.referredBy = code;

      await referral.save();
      await ReferralModel.updateOne(
        { code },
        { $push: { referees: referral._id } }
      );
    }

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    logger.error(e.message);
  }
};

const getReferral = async (req, res) => {
  const { code } = req.params;

  try {
    const referral = await ReferralModel.findOne({ code })
      .select("code -_id referees coins referredBy subscriptions")
      .populate("subscriptions")
      .populate({
        path: "referees",
        populate: {
          path: "subscriptions",
          options: {
            sort: { createdAt: -1 },
            limit: 1,
          },
        },
      });

    const referees = referral.referees.map((referee) => ({
      username: referee.code,
      income: getSubscriptionReward(referee.subscriptions[0].subscriptionType),
    }));

    res.json({
      code: referral.code,
      coins: referral.coins,
      referredBy: referral.referredBy,
      referees,
      isPremium: !!referral.subscriptions.length,
    });
  } catch (e) {
    logger.error(e.message);
  }
};

module.exports = {
  createReferral,
  getReferral,
};
