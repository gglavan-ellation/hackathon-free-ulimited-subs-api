const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    referredBy: { type: String, default: null },
    referees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referral",
      },
    ],
    subscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", ReferralSchema);
