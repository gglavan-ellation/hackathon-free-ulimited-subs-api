const { StatusCodes } = require("http-status-codes");

const ReferralModel = require("../models/referral");
const logger = require("../utils/logger");

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
      .select("code -_id referees coins referredBy")
      .populate("referees");

    res.json({
      code: referral.code,
      coins: referral.coins,
      referredBy: referral.referredBy,
      referees: referral.referees.map((referee) => referee.code),
    });
  } catch (e) {
    logger.error(e.message);
  }
};

module.exports = {
  createReferral,
  getReferral,
};
