const express= require("express");
const { createOffers, createCommunity } = require("../controllers/reachC");
const router= express.Router();

// routing

// offer
router.post('/offers',createOffers);
// community
router.post('/community',createCommunity);

module.exports = router;