const cron = require("node-cron");
const Blacklist = require("../models/blacklistModel");

// Schedule the cron job to run every hour
cron.schedule("0 * * * *", async () => {
  try {
    console.log("Running cron job to clear expired tokens...");
    const result = await Blacklist.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    console.log(`Cleared ${result.deletedCount} expired tokens.`);
  } catch (err) {
    console.error("Error clearing expired tokens:", err);
  }
});
