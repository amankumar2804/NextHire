const express = require("express");

const router = express.Router();

const Resume = require("../models/resumeModel");


// ======================================
// MIDDLEWARE — require an anonymous ID header
// ======================================

const requireAnonId = (req, res, next) => {

  const anonymousId =
    req.headers["x-anon-id"];

  if (!anonymousId) {

    return res.status(400).json({

      message:
        "Missing anonymous ID header",

    });

  }

  req.anonymousId = anonymousId;

  next();

};


// ======================================
// GET ALL RESUMES FOR THIS BROWSER
// ======================================

router.get(
  "/",
  requireAnonId,
  async (req, res) => {
    try {

      const resumes =
        await Resume.find({
          anonymousId: req.anonymousId,
        })
          .populate("template")
          .sort({ updatedAt: -1 });


      res.status(200).json({

        resumes,

      });

    } catch (error) {

      console.error(
        "Get Resumes Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch resumes",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE RESUME (must belong to this browser)
// ======================================

router.get(
  "/:id",
  requireAnonId,
  async (req, res) => {
    try {

      const resume =
        await Resume.findOne({

          _id: req.params.id,

          anonymousId: req.anonymousId,

        }).populate("template");


      if (!resume) {

        return res.status(404).json({

          message:
            "Resume not found",

        });

      }


      res.status(200).json({

        resume,

      });

    } catch (error) {

      console.error(
        "Get Resume Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch resume",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE RESUME
// ======================================

router.post(
  "/",
  requireAnonId,
  async (req, res) => {
    try {

      const {

        title,

        template,

        personalInfo,

        links,

        education,

        skillCategories,

        projects,

        experience,

        achievements,

      } = req.body;


      const resume =
        await Resume.create({

          anonymousId: req.anonymousId,

          title:
            title ||
            "My Resume",

          template:
            template ||
            null,

          personalInfo:
            personalInfo ||
            {},

          links:
            links ||
            [],

          education:
            education ||
            [],

          skillCategories:
            skillCategories ||
            [],

          projects:
            projects ||
            [],

          experience:
            experience ||
            [],

          achievements:
            achievements ||
            [],

        });


      res.status(201).json({

        message:
          "Resume created successfully",

        resume,

      });

    } catch (error) {

      console.error(
        "Create Resume Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create resume",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE RESUME (must belong to this browser)
// ======================================

router.put(
  "/:id",
  requireAnonId,
  async (req, res) => {
    try {

      const resume =
        await Resume.findOne({

          _id: req.params.id,

          anonymousId: req.anonymousId,

        });


      if (!resume) {

        return res.status(404).json({

          message:
            "Resume not found",

        });

      }


      const {

        title,

        template,

        personalInfo,

        links,

        education,

        skillCategories,

        projects,

        experience,

        achievements,

      } = req.body;


      if (title !== undefined) {
        resume.title = title;
      }

      if (template !== undefined) {
        resume.template = template;
      }

      if (personalInfo !== undefined) {
        resume.personalInfo = personalInfo;
      }

      if (links !== undefined) {
        resume.links = links;
      }

      if (education !== undefined) {
        resume.education = education;
      }

      if (skillCategories !== undefined) {
        resume.skillCategories = skillCategories;
      }

      if (projects !== undefined) {
        resume.projects = projects;
      }

      if (experience !== undefined) {
        resume.experience = experience;
      }

      if (achievements !== undefined) {
        resume.achievements = achievements;
      }


      await resume.save();


      res.status(200).json({

        message:
          "Resume updated successfully",

        resume,

      });

    } catch (error) {

      console.error(
        "Update Resume Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update resume",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE RESUME (must belong to this browser)
// ======================================

router.delete(
  "/:id",
  requireAnonId,
  async (req, res) => {
    try {

      const resume =
        await Resume.findOneAndDelete({

          _id: req.params.id,

          anonymousId: req.anonymousId,

        });


      if (!resume) {

        return res.status(404).json({

          message:
            "Resume not found",

        });

      }


      res.status(200).json({

        message:
          "Resume deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete Resume Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete resume",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;
