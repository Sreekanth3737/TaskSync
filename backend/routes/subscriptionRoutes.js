const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { saveSubscription } = require("../controllers/subscriptionController");

router.post("/", auth, saveSubscription);

module.exports = router;
