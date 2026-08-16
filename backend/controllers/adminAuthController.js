const jwt = require("jsonwebtoken");

const generateAdminToken = () =>
  jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const validEmail =
      email.trim().toLowerCase() ===
      (process.env.ADMIN_EMAIL || "").toLowerCase();

    const validPassword = password === process.env.ADMIN_PASSWORD;

    if (!validEmail || !validPassword) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const token = generateAdminToken();

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        email: process.env.ADMIN_EMAIL,
      },
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  adminLogin,
};
