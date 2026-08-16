const mongoose = require("mongoose");

const resumeTemplateSchema = new mongoose.Schema(
  {
    name: {
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

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Preview thumbnail shown in the template picker
    thumbnailImage: {
      type: String,
      default: "",
    },

    thumbnailImagePublicId: {
      type: String,
      default: "",
    },

    // Identifies which frontend React layout component renders this
    // template, e.g. "classic", "modern", "minimal"
    layoutKey: {
      type: String,
      required: true,
      trim: true,
    },

    // Accent color used in the layout, e.g. "from-indigo-500 to-violet-600"
    gradient: {
      type: String,
      default: "from-indigo-500 to-violet-600",
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
  "ResumeTemplate",
  resumeTemplateSchema
);
