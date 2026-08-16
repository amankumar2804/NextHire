const mongoose = require("mongoose");

// =====================================
// LINK SUB-SCHEMA (GitHub, LinkedIn, LeetCode, Portfolio...)
// =====================================
const linkSchema = new mongoose.Schema(
  {
    label: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
  },
  { _id: true }
);

// =====================================
// EDUCATION SUB-SCHEMA
// =====================================
const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    degree: { type: String, default: "", trim: true },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    percentage: { type: String, default: "" },
    cgpa: { type: String, default: "" },
    grade: { type: String, default: "" },
  },
  { _id: true }
);

// =====================================
// SKILL CATEGORY SUB-SCHEMA
// e.g. { category: "Frontend", skills: "React.js, Next.js, Tailwind CSS" }
// =====================================
const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, default: "", trim: true },
    skills: { type: String, default: "", trim: true },
  },
  { _id: true }
);

// =====================================
// PROJECT SUB-SCHEMA
// =====================================
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    bulletPoints: [{ type: String }],
    stack: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { _id: true }
);

// =====================================
// EXPERIENCE SUB-SCHEMA
// =====================================
const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: "", trim: true },
    role: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    currentlyWorking: { type: Boolean, default: false },
    bulletPoints: [{ type: String }],
  },
  { _id: true }
);

// =====================================
// RESUME SCHEMA
// =====================================
const resumeSchema = new mongoose.Schema(
  {
    // Anonymous browser-generated ID (login system isn't ready yet)
    anonymousId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "My Resume",
      trim: true,
    },

    // Which admin-uploaded template design the user picked as a
    // starting point / style accent (structure itself is always the
    // same fixed layout — this only tints headings/lines)
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeTemplate",
      default: null,
    },

    personalInfo: {
      fullName: { type: String, default: "" },
      location: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
    },

    links: [linkSchema],

    education: [educationSchema],

    skillCategories: [skillCategorySchema],

    projects: [projectSchema],

    experience: [experienceSchema],

    achievements: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);
