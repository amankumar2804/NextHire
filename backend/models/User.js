const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Not required for Google-only accounts
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 6,
    },

    // Set when the user signs in with Google
    googleId: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    savedJobs: [
      {
        jobId: {
          type: String,
          required: true,
        },

        title: String,

        company: String,

        slug: String,

        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
