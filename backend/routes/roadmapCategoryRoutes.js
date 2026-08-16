const express = require("express");

const RoadmapCategory = require("../models/RoadmapCategory");

const router = express.Router();


// ===============================
// CREATE CATEGORY
// ===============================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      icon,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required",
      });
    }

    const existingCategory = await RoadmapCategory.findOne({
      $or: [
        { name },
        { slug },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await RoadmapCategory.create({
      name,
      slug,
      description,
      icon,
    });

    res.status(201).json({
      message: "Roadmap category created successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to create roadmap category",
      error: error.message,
    });

  }
});


// ===============================
// GET ALL CATEGORIES
// ===============================

router.get("/", async (req, res) => {
  try {

    const categories = await RoadmapCategory.find({
      isPublished: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      categories,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch roadmap categories",
      error: error.message,
    });

  }
});


// ===============================
// GET SINGLE CATEGORY
// ===============================

router.get("/:slug", async (req, res) => {
  try {

    const category = await RoadmapCategory.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!category) {
      return res.status(404).json({
        message: "Roadmap category not found",
      });
    }

    res.status(200).json({
      category,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch roadmap category",
      error: error.message,
    });

  }
});


// ===============================
// DELETE CATEGORY
// ===============================

router.delete("/:id", async (req, res) => {
  try {

    const category = await RoadmapCategory.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Roadmap category not found",
      });
    }

    res.status(200).json({
      message: "Roadmap category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete roadmap category",
      error: error.message,
    });

  }
});


module.exports = router;