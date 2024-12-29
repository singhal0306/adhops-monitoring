const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getData,
  getDateWiseData,
} = require("../controllers/mobAvenueController");
const { getOfferData } = require("../controllers/surgexOfferController");

const router = express.Router();

router.get("/mobAvenueData", protect, getData);
router.post("/filterData", protect, getDateWiseData);
router.get("/offerData", protect, getOfferData);
module.exports = router;
