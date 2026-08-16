const mongoose = require("mongoose");

const examArticleSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCategory",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    contentType: {
      type: String,
      enum: ["article", "image-and-article"],
      default: "article",
    },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ExamArticle ||
  mongoose.model("ExamArticle", examArticleSchema);
