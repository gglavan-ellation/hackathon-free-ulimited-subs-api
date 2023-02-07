const { Router } = require("express");

const {
  createReferral,
  getActiveReferees,
} = require("../controllers/referral");

const router = Router();

router.post("/referral/new", createReferral);
router.get("/referral/:code", getActiveReferees);

module.exports = router;
