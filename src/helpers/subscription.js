const CRUNCHY_COIN_VALUE = 1 * 1;

const SUBSCRIPTION_TYPES_PRICES = {
  FAN: 7.99,
  MEGA_FAN: 9.99,
  ULTIMATE_FAN: 14.99,
};

const SUBSCRIPTION_TYPES_REWARD = {
  FAN: 1,
  MEGA_FAN: 1,
  ULTIMATE_FAN: 1,
};

const getSubscriptionPriceInCoins = (type) => {
  return SUBSCRIPTION_TYPES_PRICES[type] * CRUNCHY_COIN_VALUE;
};

const getSubscriptionReward = (type) => {
  return SUBSCRIPTION_TYPES_REWARD[type];
};

module.exports = {
  getSubscriptionPriceInCoins,
  getSubscriptionReward,
};
