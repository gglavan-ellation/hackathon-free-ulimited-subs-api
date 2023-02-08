const { Router } = require("express");

const { createReferral, getReferral } = require("../controllers/referral");

const router = Router();

router.post("/referral/new", createReferral);
router.get("/referral/:code", getReferral);

module.exports = router;
