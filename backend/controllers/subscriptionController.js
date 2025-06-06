const Subscription = require("../models/subscriptionModel");

exports.saveSubscription = async (req, res) => {
  try {
    const { endpoint, keys } = req.body;
    const user = req.user._id;
    let sub = await Subscription.findOneAndUpdate(
      { user },
      { endpoint, keys },
      { upsert: true, new: true }
    );
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
