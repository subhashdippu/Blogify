const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate raw token and hash it
    const verificationTokenRaw = `${email}-${Date.now()}`;
    const verificationToken = await bcrypt.hash(verificationTokenRaw, 10);

    const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

    // Create and save the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry,
    });

    // Save the user
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Signup successful! Please verify your email." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  signup,
};
