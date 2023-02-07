const { StatusCodes } = require("http-status-codes");

const ReferralModel = require("../models/referral");

const createReferral = async (req, res) => {
  const { username, code } = req.body;

  try {
    const referral = await ReferralModel.create({ code: username });

    if (code) {
      await ReferralModel.updateOne(
        { code },
        { $push: { referees: referral._id } }
      );
    }

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    console.log("Error:", e.message);
  }
};

const getActiveReferees = async (req, res) => {
  const { code } = req.params;

  try {
    const user = await ReferralModel.findOne({ code })
      .select("code -_id referees coins")
      .populate("referees.code");

    res.json(user);
  } catch (e) {
    console.log("Error:", e.message);
  }
};

module.exports = {
  createReferral,
  getActiveReferees,
};
