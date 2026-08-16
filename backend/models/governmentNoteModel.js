const mongoose = require("mongoose");

const governmentNoteSchema =
  new mongoose.Schema(
    {
      // Notes category ID
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GovernmentNotesCategory",
        required: true,
      },

      // Subject ID
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      // Note title
      title: {
        type: String,
        required: true,
        trim: true,
      },

      // Short description
      description: {
        type: String,
        default: "",
        trim: true,
      },

      // Main note content
      content: {
        type: String,
        default: "",
      },

      // Note image
      image: {
        type: String,
        default: "",
      },

      // Cloudinary image public ID
      imagePublicId: {
        type: String,
        default: "",
      },

      // PDF URL
      pdf: {
        type: String,
        default: "",
      },

      // Cloudinary PDF public ID
      pdfPublicId: {
        type: String,
        default: "",
      },

      // Publish status
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
  mongoose.model(
    "GovernmentNote",
    governmentNoteSchema
  );