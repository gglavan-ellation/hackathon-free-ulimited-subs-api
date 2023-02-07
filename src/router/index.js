const { Router } = require("express");

const {
  getActiveReferees,
  getReferralPoints,
} = require("../controllers/referral");

const router = Router();

router.get("/referral/list", getActiveReferees);
router.get("/referral/points", getReferralPoints);

module.exports = router;
