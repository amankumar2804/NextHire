const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");


// ===============================
// ROUTES
// ===============================

const authRoutes = require(
  "./routes/authRoutes"
);

const jobRoutes = require(
  "./routes/jobRoutes"
);

const roadmapCategoryRoutes = require(
  "./routes/roadmapCategoryRoutes"
);

const roadmapFileRoutes = require(
  "./routes/roadmapFileRoutes"
);

const interviewExperienceRoutes = require(
  "./routes/interviewExperienceRoutes"
);

const techStackCategoryRoutes = require(
  "./routes/techStackCategoryRoutes"
);

const techStackResourceRoutes = require(
  "./routes/techStackResourceRoutes"
);

const coreSubjectCategoryRoutes = require(
  "./routes/coreSubjectCategoryRoutes"
);

const coreSubjectResourceRoutes = require(
  "./routes/coreSubjectResourceRoutes"
);

const uploadRoutes = require(
  "./routes/uploadRoutes"
);


// ===============================
// EXAM BLUEPRINT ROUTES
// ===============================

const examBlueprintRoutes = require(
  "./routes/examBlueprintRoutes"
);


// ===============================
// GOVERNMENT EXAM CATEGORY ROUTES
// ===============================

const governmentExamCategoryRoutes = require(
  "./routes/governmentExamCategoryRoutes"
);


// ===============================
// EXAM CATEGORY ROUTES
// ===============================

const examCategoryRoutes = require(
  "./routes/examCategoryRoutes"
);


// ===============================
// EXAM ARTICLE ROUTES
// ===============================

const examArticleRoutes = require(
  "./routes/examArticleRoutes"
);


// ===============================
// GOVERNMENT NOTES CATEGORY ROUTES
// ===============================

const governmentNotesCategoryRoutes = require(
  "./routes/governmentNotesCategoryRoutes"
);


// ===============================
// GOVERNMENT NOTES ROUTES
// ===============================

const governmentNotesRoutes = require(
  "./routes/governmentNotesRoutes"
);


// ===============================
// CAREER NEWS ROUTES
// ===============================

const careerNewsRoutes = require(
  "./routes/careerNewsRoutes"
);


// ===============================
// RESUME ROUTES
// ===============================

const resumeRoutes = require(
  "./routes/resumeRoutes"
);

const resumeTemplateRoutes = require(
  "./routes/resumeTemplateRoutes"
);

const resumeTipRoutes = require(
  "./routes/resumeTipRoutes"
);


// ===============================
// DIRECT HIRING ROUTES
// ===============================

const directHiringRoutes = require(
  "./routes/directHiringRoutes"
);


// ===============================
// APP
// ===============================

const app = express();


// ===============================
// CONNECT MONGODB
// ===============================

connectDB();


// ===============================
// MIDDLEWARES
// ===============================

app.use(
  cors()
);

app.use(
  express.json()
);


// ===============================
// TEST ROUTE
// ===============================

app.get(
  "/",
  (req, res) => {

    res.json({

      message:
        "NextHire Backend is running 🚀",

    });

  }
);


// ===============================
// AUTH ROUTES
// ===============================

app.use(
  "/api/auth",
  authRoutes
);


// ===============================
// JOB ROUTES
// ===============================

app.use(
  "/api/jobs",
  jobRoutes
);


// ===============================
// ROADMAP CATEGORY ROUTES
// ===============================

app.use(
  "/api/roadmap-categories",
  roadmapCategoryRoutes
);


// ===============================
// ROADMAP FILE ROUTES
// ===============================

app.use(
  "/api/roadmap-files",
  roadmapFileRoutes
);


// ===============================
// INTERVIEW EXPERIENCE ROUTES
// ===============================

app.use(
  "/api/interview-experiences",
  interviewExperienceRoutes
);


// ===============================
// TECH STACK CATEGORY ROUTES
// ===============================

app.use(
  "/api/tech-stack-categories",
  techStackCategoryRoutes
);


// ===============================
// TECH STACK RESOURCE ROUTES
// ===============================

app.use(
  "/api/tech-stack-resources",
  techStackResourceRoutes
);


// ===============================
// CORE SUBJECT CATEGORY ROUTES
// ===============================

app.use(
  "/api/core-subject-categories",
  coreSubjectCategoryRoutes
);


// ===============================
// CORE SUBJECT RESOURCE ROUTES
// ===============================

app.use(
  "/api/core-subject-resources",
  coreSubjectResourceRoutes
);


// ===============================
// CLOUDINARY UPLOAD ROUTES
// ===============================

app.use(
  "/api/upload",
  uploadRoutes
);


// ===============================
// EXAM BLUEPRINT ROUTES
// ===============================

app.use(
  "/api/exam-blueprints",
  examBlueprintRoutes
);


// ===============================
// GOVERNMENT EXAM CATEGORY ROUTES
// ===============================

app.use(
  "/api/government-exam-categories",
  governmentExamCategoryRoutes
);


// ===============================
// EXAM CATEGORY ROUTES
// ===============================

app.use(
  "/api/exam-categories",
  examCategoryRoutes
);


// ===============================
// EXAM ARTICLE ROUTES
// ===============================

app.use(
  "/api/exam-articles",
  examArticleRoutes
);


// ===============================
// GOVERNMENT NOTES CATEGORY ROUTES
// ===============================

app.use(
  "/api/government-notes-categories",
  governmentNotesCategoryRoutes
);


// ===============================
// GOVERNMENT NOTES ROUTES
// ===============================

app.use(
  "/api/government-notes",
  governmentNotesRoutes
);


// ===============================
// CAREER NEWS ROUTES
// ===============================

app.use(
  "/api/career-news",
  careerNewsRoutes
);


// ===============================
// RESUME ROUTES
// ===============================

app.use(
  "/api/resumes",
  resumeRoutes
);

app.use(
  "/api/resume-templates",
  resumeTemplateRoutes
);

app.use(
  "/api/resume-tips",
  resumeTipRoutes
);


// ===============================
// DIRECT HIRING ROUTES
// ===============================

app.use(
  "/api/direct-hiring",
  directHiringRoutes
);

app.use("/api/admin-auth", require("./routes/adminAuthRoutes"));


// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use(
  (err, req, res, next) => {

    console.error(
      err.stack
    );


    res.status(500).json({

      message:
        "Something went wrong",

      error:
        err.message,

    });

  }
);


// ===============================
// SERVER
// ===============================

const PORT =
  process.env.PORT || 5000;


app.listen(

  PORT,

  () => {

    console.log(

      `Server running on port ${PORT} 🚀`

    );

  }

);
