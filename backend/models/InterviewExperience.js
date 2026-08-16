const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema(
  {
    // Basic Information

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    interviewType: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
    },

    rounds: {
      type: String,
      trim: true,
    },

    // Short Summary

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    // Complete Article

    article: {
      type: String,
      required: true,
    },

    // Optional Tips

    tips: {
      type: String,
    },

    // Featured Image / Company Logo (Optional)

    imageUrl: {
      type: String,
    },

    // URL Slug

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Publish Status

    isPublished: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewExperience",
  interviewExperienceSchema
);