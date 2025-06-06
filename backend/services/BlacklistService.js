const Blacklist = require("../models/blacklistModel");

exports.addTokenToBlacklist = async (token, expiresIn) => {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  await Blacklist.create({ token, expiresAt });
};

exports.isTokenBlacklisted = async (token) => {
  const blacklistedToken = await Blacklist.findOne({ token });
  return !!blacklistedToken;
};

exports.cleanExpiredTokens = async () => {
  await Blacklist.deleteMany({ expiresAt: { $lt: new Date() } });
};
