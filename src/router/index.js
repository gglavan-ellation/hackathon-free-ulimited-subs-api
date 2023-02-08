const { Router } = require("express");

const { createReferral, getReferral } = require("../controllers/referral");
const { createSubscription } = require("../controllers/subscription");

const router = Router();

router.post("/referral/new", createReferral);
router.get("/referral/:code", getReferral);

router.post("/subscription/new", createSubscription);

module.exports = router;
