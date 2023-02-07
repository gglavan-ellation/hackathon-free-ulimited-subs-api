const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
  referees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referral",
    },
  ],
});

module.exports = mongoose.model("Referral", ReferralSchema);
