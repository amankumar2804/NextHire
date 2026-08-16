const mongoose = require("mongoose");

const careerNewsSchema =
  new mongoose.Schema(
    {
      // Headline
      title: {
        type: String,
        required: true,
        trim: true,
      },

      // URL-friendly identifier
      slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      // Small tag shown on cards, e.g. "Technology", "Government Jobs"
      category: {
        type: String,
        default: "General",
        trim: true,
      },

      // Where the news came from, e.g. "AFP", "Reuters"
      source: {
        type: String,
        default: "",
        trim: true,
      },

      // Short summary shown on list/card view
      excerpt: {
        type: String,
        default: "",
        trim: true,
      },

      // Full article body — stored as HTML from the rich text editor
      content: {
        type: String,
        required: true,
      },

      // Card / hero thumbnail
      thumbnailImage: {
        type: String,
        default: "",
      },

      thumbnailImagePublicId: {
        type: String,
        default: "",
      },

      // Shown as the big headline story on the list page
      isFeatured: {
        type: Boolean,
        default: false,
      },

      isPublished: {
        type: Boolean,
        default: true,
      },

      // Incremented every time the article is opened —
      // drives the automatic "Most Popular" sidebar
      viewCount: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "CareerNews",
    careerNewsSchema
  );
