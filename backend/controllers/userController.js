const userService = require("../services/userService");

exports.registerUser = async (req, res) => {
  try {
    console.log("Registering user:", req.body.email, req.body.role);
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
