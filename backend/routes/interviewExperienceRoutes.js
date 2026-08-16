const express = require("express");

const InterviewExperience = require(
  "../models/InterviewExperience"
);

const router = express.Router();


// =====================================
// CREATE INTERVIEW EXPERIENCE
// =====================================

router.post("/", async (req, res) => {
  try {
    const {
      company,
      role,
      interviewType,
      category,
      location,
      year,
      rounds,
      summary,
      article,
      tips,
      imageUrl,
      slug,
      isPublished,
    } = req.body;


    if (
      !company ||
      !role ||
      !interviewType ||
      !category ||
      !summary ||
      !article ||
      !slug
    ) {
      return res.status(400).json({
        message:
          "Company, role, interview type, category, summary, article and slug are required",
      });
    }


    const existingExperience =
      await InterviewExperience.findOne({
        slug,
      });


    if (existingExperience) {
      return res.status(400).json({
        message:
          "An interview experience with this slug already exists",
      });
    }


    const experience =
      await InterviewExperience.create({
        company,
        role,
        interviewType,
        category,
        location,
        year,
        rounds,
        summary,
        article,
        tips,
        imageUrl,
        slug,
        isPublished:
          isPublished !== undefined
            ? isPublished
            : true,
      });


    res.status(201).json({
      message:
        "Interview experience created successfully",

      experience,
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to create interview experience",

      error: error.message,
    });
  }
});


// =====================================
// GET ALL PUBLISHED EXPERIENCES
// =====================================

router.get("/", async (req, res) => {
  try {
    const experiences =
      await InterviewExperience.find({
        isPublished: true,
      }).sort({
        createdAt: -1,
      });


    res.status(200).json({
      experiences,
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch interview experiences",

      error: error.message,
    });
  }
});


// =====================================
// GET EXPERIENCE BY ID
// IMPORTANT: THIS MUST COME BEFORE /:slug
// =====================================

router.get("/id/:id", async (req, res) => {
  try {
    const experience =
      await InterviewExperience.findById(
        req.params.id
      );


    if (!experience) {
      return res.status(404).json({
        message:
          "Interview experience not found",
      });
    }


    res.status(200).json({
      experience,
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch interview experience",

      error: error.message,
    });
  }
});


// =====================================
// GET SINGLE EXPERIENCE BY SLUG
// =====================================

router.get("/:slug", async (req, res) => {
  try {
    const experience =
      await InterviewExperience.findOne({
        slug: req.params.slug,

        isPublished: true,
      });


    if (!experience) {
      return res.status(404).json({
        message:
          "Interview experience not found",
      });
    }


    res.status(200).json({
      experience,
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch interview experience",

      error: error.message,
    });
  }
});


// =====================================
// UPDATE EXPERIENCE
// =====================================

router.put("/:id", async (req, res) => {
  try {
    const experience =
      await InterviewExperience.findByIdAndUpdate(
        req.params.id,

        req.body,

        {
          new: true,

          runValidators: true,
        }
      );


    if (!experience) {
      return res.status(404).json({
        message:
          "Interview experience not found",
      });
    }


    res.status(200).json({
      message:
        "Interview experience updated successfully",

      experience,
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to update interview experience",

      error: error.message,
    });
  }
});


// =====================================
// DELETE EXPERIENCE
// =====================================

router.delete("/:id", async (req, res) => {
  try {
    const experience =
      await InterviewExperience.findByIdAndDelete(
        req.params.id
      );


    if (!experience) {
      return res.status(404).json({
        message:
          "Interview experience not found",
      });
    }


    res.status(200).json({
      message:
        "Interview experience deleted successfully",
    });


  } catch (error) {
    res.status(500).json({
      message:
        "Failed to delete interview experience",

      error: error.message,
    });
  }
});


module.exports = router;