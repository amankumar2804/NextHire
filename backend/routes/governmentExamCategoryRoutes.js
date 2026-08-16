const express = require("express");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require(
  "../controllers/governmentExamCategoryController"
);

const router = express.Router();


// ===============================
// GET ALL CATEGORIES
// ===============================

router.get(
  "/",
  getCategories
);


// ===============================
// GET SINGLE CATEGORY
// ===============================

router.get(
  "/:id",
  getCategoryById
);


// ===============================
// CREATE CATEGORY
// ===============================

router.post(
  "/",
  createCategory
);


// ===============================
// UPDATE CATEGORY
// ===============================

router.put(
  "/:id",
  updateCategory
);


// ===============================
// DELETE CATEGORY
// ===============================

router.delete(
  "/:id",
  deleteCategory
);


module.exports = router;