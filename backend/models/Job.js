const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Domain / department badge, e.g. "Software Development" (Private)
    // or exam/organization name, e.g. "SSC CGL" (Government)
    category: {
      type: String,
      required: true,
    },

    // Private vs Government job — drives which section the job appears in
    sector: {
      type: String,
      enum: ["Private", "Government"],
      default: "Private",
    },

    location: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },

    salary: {
      type: String,
      default: "Not disclosed",
    },

    description: {
      type: String,
      required: true,
    },

    eligibility: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    lastDate: {
      type: String,
    },

    applyUrl: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Company logo / organization logo
    companyImage: {
      type: String,
      default: "",
    },

    companyImagePublicId: {
      type: String,
      default: "",
    },

    // Up to 3 HR/employee contacts for cold-message referrals (Private jobs only)
    referralContacts: [
      {
        name: {
          type: String,
          trim: true,
        },
        role: {
          type: String,
          trim: true,
        },
        linkedinUrl: {
          type: String,
          trim: true,
        },
        verified: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // ===== Government-specific fields =====

    notificationPdf: {
      type: String,
      default: "",
    },

    notificationPdfPublicId: {
      type: String,
      default: "",
    },

    totalVacancies: {
      type: String,
      default: "",
    },

    applicationFee: {
      type: String,
      default: "",
    },

    examDate: {
      type: String,
      default: "",
    },

    // Future Direct Hiring support
    hiringType: {
      type: String,
      enum: ["regular", "direct-hiring"],
      default: "regular",
    },

    // Direct Hiring ke liye future me use hoga
    applicationEmail: {
      type: String,
    },

    sourceUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
