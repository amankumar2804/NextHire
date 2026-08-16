const express = require("express");

const {
  createExamBlueprint,
  getAllExamBlueprints,
  getPublishedExamBlueprints,
  getExamBlueprintBySlug,
  getExamBlueprintById,
  updateExamBlueprint,
  deleteExamBlueprint,
  toggleExamBlueprintPublish,
} = require("../controllers/examBlueprintController");

const router = express.Router();


// ===============================
// PUBLIC ROUTES
// ===============================

// GET ALL PUBLISHED EXAM BLUEPRINTS

router.get(
  "/published",
  getPublishedExamBlueprints
);


// GET SINGLE PUBLISHED EXAM BY SLUG

router.get(
  "/slug/:slug",
  getExamBlueprintBySlug
);


// ===============================
// ADMIN ROUTES
// ===============================

// GET ALL EXAM BLUEPRINTS

router.get(
  "/",
  getAllExamBlueprints
);


// CREATE EXAM BLUEPRINT

router.post(
  "/",
  createExamBlueprint
);


// GET SINGLE EXAM BLUEPRINT BY ID

router.get(
  "/:id",
  getExamBlueprintById
);


// UPDATE EXAM BLUEPRINT

router.put(
  "/:id",
  updateExamBlueprint
);


// DELETE EXAM BLUEPRINT

router.delete(
  "/:id",
  deleteExamBlueprint
);


// TOGGLE PUBLISH STATUS

router.patch(
  "/:id/toggle-publish",
  toggleExamBlueprintPublish
);


module.exports = router;