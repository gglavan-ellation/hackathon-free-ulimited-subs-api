const { StatusCodes } = require("http-status-codes");

const logger = require("../utils/logger");
const SubscriptionModel = require("../models/subscription");
const ReferralModel = require("../models/referral");
const {
  getSubscriptionPriceInCoins,
  getSubscriptionReward,
} = require("../helpers/subscription");

const createSubscription = async (req, res) => {
  const { username, subscriptionType, paymentPeriod, useCoins } = req.body;

  try {
    const referee = await ReferralModel.findOne({ code: username });

    if (referee) {
      if (useCoins) {
        const priceInCoins = getSubscriptionPriceInCoins(subscriptionType);
        const payAmount = Math.min(referee.coins, priceInCoins);

        await ReferralModel.updateOne(
          { code: username },
          { $inc: { coins: -payAmount } }
        );
      }

      const subscription = await SubscriptionModel.create({
        referralId: referee._id,
        subscriptionType,
        paymentPeriod,
      });

      referee.subscriptions.push(subscription._id);

      await referee.save();

      const referrer = await ReferralModel.findOne({
        code: referee.referredBy,
      });

      if (referrer) {
        referrer.coins += getSubscriptionReward(subscriptionType);
        await referrer.save();
      }
    }

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    logger.error(e.message);
  }
};

module.exports = {
  createSubscription,
};
