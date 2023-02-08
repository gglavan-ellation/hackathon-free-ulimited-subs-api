const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    referralId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referral",
    },
    subscriptionType: { type: String },
    paymentPeriod: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
