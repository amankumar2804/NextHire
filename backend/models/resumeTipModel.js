const mongoose = require("mongoose");

const resumeTipSchema = new mongoose.Schema(
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

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    excerpt: {
      type: String,
      default: "",
      trim: true,
    },

    // Full guide body — HTML from the rich text editor
    content: {
      type: String,
      required: true,
    },

    thumbnailImage: {
      type: String,
      default: "",
    },

    thumbnailImagePublicId: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResumeTip", resumeTipSchema);
