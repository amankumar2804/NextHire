const express = require("express");

const {
  createJob,
  getRegularJobs,
  getAdminAllJobs,
  getJobById,
  getJobBySlug,
  updateJob,
  deleteJob,
  saveJob,
  checkSavedJob,
  getSavedJobs,
  getDirectHiringJobs,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminAuthMiddleware");

const router = express.Router();


// ===============================
// CREATE JOB
// ===============================

router.post(
  "/create",
  protectAdmin,
  createJob
);


// ===============================
// GET REGULAR JOBS (supports ?sector=Private or ?sector=Government)
// ===============================

router.get(
  "/",
  getRegularJobs
);


// ===============================
// GET ALL SAVED JOBS
// ===============================

router.get(
  "/saved",
  protect,
  getSavedJobs
);


// ===============================
// GET DIRECT HIRING JOBS
// ===============================

router.get(
  "/direct-hiring",
  getDirectHiringJobs
);


// ===============================
// GET ALL JOBS — ADMIN (includes inactive)
// ===============================

router.get(
  "/admin/all",
  protectAdmin,
  getAdminAllJobs
);


// ===============================
// GET SINGLE JOB BY ID — ADMIN (for edit form)
// ===============================

router.get(
  "/admin/id/:id",
  protectAdmin,
  getJobById
);


// ===============================
// UPDATE JOB
// ===============================

router.put(
  "/:id",
  protectAdmin,
  updateJob
);


// ===============================
// DELETE JOB
// ===============================

router.delete(
  "/:id",
  protectAdmin,
  deleteJob
);


// ===============================
// SAVE JOB
// ===============================

router.post(
  "/save",
  protect,
  saveJob
);


// ===============================
// CHECK SAVED JOB
// ===============================

router.get(
  "/check/:jobId",
  protect,
  checkSavedJob
);


// ===============================
// GET SINGLE JOB BY SLUG (keep last — catch-all single segment)
// ===============================

router.get(
  "/:slug",
  getJobBySlug
);


module.exports = router;
