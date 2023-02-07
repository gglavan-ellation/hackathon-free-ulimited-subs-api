const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  referees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReferralSchema",
    },
  ],
});

module.exports = mongoose.model("Referral", ReferralSchema);
