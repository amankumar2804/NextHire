const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const otpEmailTemplate = (otp, purpose) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px;">
    <h2 style="color:#1e293b; margin-bottom: 4px;">Next<span style="color:#2563eb;">Hire</span></h2>
    <p style="color:#475569;">Use the code below to ${purpose}. This code expires in 10 minutes.</p>
    <div style="margin: 24px 0; text-align:center;">
      <span style="display:inline-block; letter-spacing: 8px; font-size: 32px; font-weight: 800; color:#2563eb; background:#eff6ff; padding: 16px 24px; border-radius: 12px;">
        ${otp}
      </span>
    </div>
    <p style="color:#94a3b8; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
  </div>
`;


// ===============================
// REGISTER (sends OTP, does not log in yet)
// ===============================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);

    let user;

    if (existingUser && !existingUser.isVerified) {
      // Re-registering before verifying — update details and resend OTP
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      user = await existingUser.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false,
      });
    }

    try {
      await sendEmail({
        to: email,
        subject: "Verify your NextHire account",
        html: otpEmailTemplate(otp, "verify your account"),
      });
    } catch (emailError) {
      console.error("Send OTP Email Error:", emailError);

      return res.status(500).json({
        message:
          "Account created but failed to send OTP email. Please try resending.",
      });
    }

    res.status(201).json({
      message: "OTP sent to your email. Please verify to continue.",
      email: user.email,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// VERIFY OTP (activates account, logs in)
// ===============================

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account already verified",
      });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Account verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// RESEND OTP
// ===============================

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account already verified",
      });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Your new NextHire OTP",
      html: otpEmailTemplate(otp, "verify your account"),
    });

    res.status(200).json({
      message: "A new OTP has been sent to your email",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// LOGIN
// ===============================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      // Send a fresh OTP so the frontend can route them straight to verification
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
      await user.save();

      try {
        await sendEmail({
          to: email,
          subject: "Verify your NextHire account",
          html: otpEmailTemplate(otp, "verify your account"),
        });
      } catch (emailError) {
        console.error("Send OTP Email Error:", emailError);
      }

      return res.status(403).json({
        message:
          "Please verify your account first. We've sent a new OTP to your email.",
        requiresVerification: true,
        email: user.email,
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// GOOGLE SIGN-IN / SIGN-UP
// ===============================

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({
        message: "Unable to verify Google account",
      });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name || payload.email.split("@")[0],
        email: payload.email,
        googleId: payload.sub,
        isVerified: true,
      });
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error);

    res.status(401).json({
      message: "Google authentication failed",
    });
  }
};


// ===============================
// FORGOT PASSWORD (sends OTP)
// ===============================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // Don't reveal whether the account exists
    if (!user) {
      return res.status(200).json({
        message: "If an account exists with this email, an OTP has been sent.",
      });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reset your NextHire password",
      html: otpEmailTemplate(otp, "reset your password"),
    });

    res.status(200).json({
      message: "If an account exists with this email, an OTP has been sent.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// RESET PASSWORD (verifies OTP, sets new password)
// ===============================

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      message: "Password reset successfully. Please login.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  googleAuth,
  forgotPassword,
  resetPassword,
};
