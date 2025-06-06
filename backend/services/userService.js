const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async ({ email, password, role }) => {
  console.log("Registering user:", email, role);
  if (!email || !password) throw new Error("Email and password are required");
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  const user = await User.create({ email, password, role });
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};
