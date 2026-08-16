const mongoose = require("mongoose");

const coreSubjectResourceSchema = new mongoose.Schema(
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
      ref: "CoreSubjectCategory",
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["PDF", "JPG", "JPEG", "PNG"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
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

module.exports =
  mongoose.models.CoreSubjectResource ||
  mongoose.model(
    "CoreSubjectResource",
    coreSubjectResourceSchema
  );