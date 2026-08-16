const mongoose = require("mongoose");


// ======================================
// EXAM CATEGORY SCHEMA
// ======================================

const examCategorySchema = new mongoose.Schema(
  {

    // ======================================
    // GOVERNMENT EXAM CATEGORY
    // ======================================
    // Example:
    // SSC Exams
    // Banking Exams
    // Railway Exams
    //
    // Exam Blueprint ke exams ke liye

    governmentCategory: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "GovernmentExamCategory",

      required: function () {
        return !this.governmentNotesCategory;
      },
    },


    // ======================================
    // GOVERNMENT NOTES CATEGORY
    // ======================================
    // Example:
    // SSC Notes
    // Banking Notes
    // Railway Notes
    //
    // Government Notes ke exams ke liye

    governmentNotesCategory: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "GovernmentNotesCategory",

      required: function () {
        return !this.governmentCategory;
      },
    },


    // ======================================
    // EXAM NAME
    // ======================================

    name: {
      type: String,

      required: true,

      trim: true,
    },


    // ======================================
    // URL SLUG
    // ======================================

    slug: {
      type: String,

      required: true,

      trim: true,
    },


    // ======================================
    // SHORT DESCRIPTION
    // ======================================

    description: {
      type: String,

      required: true,

      trim: true,
    },


    // ======================================
    // EMOJI / ICON
    // ======================================

    icon: {
      type: String,

      default: "📚",
    },


    // ======================================
    // OPTIONAL IMAGE
    // ======================================

    image: {
      type: String,

      default: "",
    },


    // ======================================
    // CLOUDINARY PUBLIC ID
    // ======================================

    imagePublicId: {
      type: String,

      default: "",
    },


    // ======================================
    // TAILWIND GRADIENT
    // ======================================

    gradient: {
      type: String,

      default:
        "from-blue-500 to-indigo-600",
    },


    // ======================================
    // ACTIVE / INACTIVE
    // ======================================

    isActive: {
      type: Boolean,

      default: true,
    },

  },

  {
    timestamps: true,
  }

);


// ======================================
// GOVERNMENT EXAM CATEGORY
// SAME SLUG DUPLICATE NAHI HOGA
// ======================================

examCategorySchema.index(
  {
    governmentCategory: 1,

    slug: 1,
  },

  {
    unique: true,

    partialFilterExpression: {
      governmentCategory: {
        $exists: true,
      },
    },
  }

);


// ======================================
// GOVERNMENT NOTES CATEGORY
// SAME SLUG DUPLICATE NAHI HOGA
// ======================================

examCategorySchema.index(
  {
    governmentNotesCategory: 1,

    slug: 1,
  },

  {
    unique: true,

    partialFilterExpression: {
      governmentNotesCategory: {
        $exists: true,
      },
    },
  }

);


// ======================================
// EXPORT MODEL
// ======================================

module.exports =
  mongoose.models.ExamCategory ||

  mongoose.model(
    "ExamCategory",

    examCategorySchema
  );