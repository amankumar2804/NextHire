const mongoose = require("mongoose");

const techStackResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechStackCategory",
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["PDF", "JPG", "JPEG", "PNG", "ARTICLE"],
      required: true,
    },

    fileUrl: {
      type: String,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    fileSize: {
      type: String,
      default: "",
    },

    article: {
      type: String,
      default: "",
    },

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
  "TechStackResource",
  techStackResourceSchema
);