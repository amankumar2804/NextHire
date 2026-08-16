import mongoose from "mongoose";

const examBlueprintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    examName: {
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

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "📘",
    },

    image: {
      type: String,
      default: "",
    },

    articleContent: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ExamBlueprint = mongoose.model(
  "ExamBlueprint",
  examBlueprintSchema
);

export default ExamBlueprint;