const mongoose = require("mongoose");

const directHiringJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    // Company logo / banner image
    companyImage: {
      type: String,
      default: "",
    },

    companyImagePublicId: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      default: "Full-time",
    },

    salary: {
      type: String,
      default: "",
      trim: true,
    },

    lastDate: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    whoCanApply: [{ type: String }],

    requiredSkills: [{ type: String }],

    hiringEmail: {
      type: String,
      required: true,
      trim: true,
    },

    originalPostUrl: {
      type: String,
      default: "",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DirectHiringJob",
  directHiringJobSchema
);
