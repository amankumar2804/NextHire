const mongoose = require("mongoose");

const coreSubjectCategorySchema =
  new mongoose.Schema(
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
        lowercase: true,
        trim: true,
      },

      description: {
        type: String,
        trim: true,
      },

      imageUrl: {
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
  "CoreSubjectCategory",
  coreSubjectCategorySchema
);