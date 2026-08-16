const mongoose = require("mongoose");

// ======================================
// NOTE SCHEMA
// ======================================

const noteSchema = new mongoose.Schema(
  {
    // Note Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Note Slug
    slug: {
      type: String,
      required: true,
      trim: true,
    },

    // Short Description
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Full Content
    content: {
      type: String,
      default: "",
    },

    // Cover Image
    image: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    // PDF
    pdf: {
      type: String,
      default: "",
    },

    pdfPublicId: {
      type: String,
      default: "",
    },

    // Published / Draft
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// SUBJECT SCHEMA
// ======================================

const subjectSchema =
  new mongoose.Schema(
    {
      // Subject Name
      name: {
        type: String,
        required: true,
        trim: true,
      },

      // Subject Slug
      slug: {
        type: String,
        required: true,
        trim: true,
      },

      // Subject Description
      description: {
        type: String,
        default: "",
        trim: true,
      },

      // Emoji / Icon
      icon: {
        type: String,
        default: "📚",
      },

      // Optional Image
      image: {
        type: String,
        default: "",
      },

      // Cloudinary Public ID
      imagePublicId: {
        type: String,
        default: "",
      },

      // Tailwind Gradient
      gradient: {
        type: String,
        default: "from-indigo-500 to-violet-600",
      },

      // Active / Inactive
      isActive: {
        type: Boolean,
        default: true,
      },

      // Created At
      createdAt: {
        type: Date,
        default: Date.now,
      },

      // Updated At
      updatedAt: {
        type: Date,
        default: Date.now,
      },

      // ======================================
      // NOTES
      // ======================================

      notes: {
        type: [noteSchema],
        default: [],
      },
    }
  );

// ======================================
// GOVERNMENT NOTES CATEGORY SCHEMA
// ======================================

const governmentNotesCategorySchema =
  new mongoose.Schema(
    {
      // Example:
      // SSC Notes
      // Banking Notes
      // Railway Notes
      name: {
        type: String,
        required: true,
        trim: true,
      },

      // Example:
      // ssc
      // banking
      // railway
      slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      // Short Description
      description: {
        type: String,
        required: true,
        trim: true,
      },

      // Emoji / Icon
      icon: {
        type: String,
        default: "📚",
      },

      // Optional Image
      image: {
        type: String,
        default: "",
      },

      // Cloudinary Public ID
      imagePublicId: {
        type: String,
        default: "",
      },

      // Tailwind Gradient
      gradient: {
        type: String,
        default: "from-indigo-500 to-violet-600",
      },

      // Featured Category
      isFeatured: {
        type: Boolean,
        default: false,
      },

      // Active / Inactive
      isActive: {
        type: Boolean,
        default: true,
      },

      // ======================================
      // SUBJECTS
      // ======================================

      subjects: {
        type: [subjectSchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "GovernmentNotesCategory",
  governmentNotesCategorySchema
);