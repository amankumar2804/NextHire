const express = require("express");

const router = express.Router();

const DirectHiringJob = require("../models/directHiringModel");
const protectAdmin = require("../middleware/adminAuthMiddleware");


// ======================================
// GET ALL JOBS (public, active only)
// ======================================

router.get(
  "/",
  async (req, res) => {
    try {

      const jobs =
        await DirectHiringJob.find({
          isActive: true,
        }).sort({ createdAt: -1 });


      res.status(200).json({

        jobs,

      });

    } catch (error) {

      console.error(
        "Get Direct Hiring Jobs Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch jobs",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET ALL JOBS — ADMIN (includes inactive)
// ======================================

router.get(
  "/admin/all",
  protectAdmin,
  async (req, res) => {
    try {

      const jobs =
        await DirectHiringJob.find().sort({
          createdAt: -1,
        });


      res.status(200).json({

        jobs,

      });

    } catch (error) {

      console.error(
        "Get Admin Direct Hiring Jobs Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch jobs",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE JOB BY SLUG (public)
// ======================================

router.get(
  "/slug/:slug",
  async (req, res) => {
    try {

      const job =
        await DirectHiringJob.findOne({

          slug: req.params.slug,

          isActive: true,

        });


      if (!job) {

        return res.status(404).json({

          message:
            "Job not found",

        });

      }


      res.status(200).json({

        job,

      });

    } catch (error) {

      console.error(
        "Get Direct Hiring Job Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch job",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE JOB BY ID (admin — for edit form)
// ======================================

router.get(
  "/:id",
  protectAdmin,
  async (req, res) => {
    try {

      const job =
        await DirectHiringJob.findById(
          req.params.id
        );


      if (!job) {

        return res.status(404).json({

          message:
            "Job not found",

        });

      }


      res.status(200).json({

        job,

      });

    } catch (error) {

      console.error(
        "Get Direct Hiring Job By Id Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch job",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE JOB
// ======================================

router.post(
  "/",
  protectAdmin,
  async (req, res) => {
    try {

      const {

        title,

        slug,

        company,

        companyImage,

        companyImagePublicId,

        location,

        experience,

        jobType,

        salary,

        lastDate,

        description,

        whoCanApply,

        requiredSkills,

        hiringEmail,

        originalPostUrl,

        isVerified,

        isActive,

      } = req.body;


      if (!title || !title.trim()) {

        return res.status(400).json({

          message:
            "Job title is required",

        });

      }


      if (!company || !company.trim()) {

        return res.status(400).json({

          message:
            "Company name is required",

        });

      }


      if (!hiringEmail || !hiringEmail.trim()) {

        return res.status(400).json({

          message:
            "Hiring email is required",

        });

      }


      const normalizedSlug =

        slug && slug.trim()

          ? slug.toLowerCase().trim()

          : `${title}-${company}`
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");


      const existingJob =
        await DirectHiringJob.findOne({
          slug: normalizedSlug,
        });


      if (existingJob) {

        return res.status(400).json({

          message:
            "A job with this slug already exists",

        });

      }


      const job =
        await DirectHiringJob.create({

          title: title.trim(),

          slug: normalizedSlug,

          company: company.trim(),

          companyImage: companyImage || "",

          companyImagePublicId: companyImagePublicId || "",

          location: location || "",

          experience: experience || "",

          jobType: jobType || "Full-time",

          salary: salary || "",

          lastDate: lastDate || "",

          description: description || "",

          whoCanApply: whoCanApply || [],

          requiredSkills: requiredSkills || [],

          hiringEmail: hiringEmail.trim(),

          originalPostUrl: originalPostUrl || "",

          isVerified:

            isVerified !== undefined

              ? isVerified

              : true,

          isActive:

            isActive !== undefined

              ? isActive

              : true,

        });


      res.status(201).json({

        message:
          "Job created successfully",

        job,

      });

    } catch (error) {

      console.error(
        "Create Direct Hiring Job Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create job",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE JOB
// ======================================

router.put(
  "/:id",
  protectAdmin,
  async (req, res) => {
    try {

      const job =
        await DirectHiringJob.findById(
          req.params.id
        );


      if (!job) {

        return res.status(404).json({

          message:
            "Job not found",

        });

      }


      const {

        title,

        slug,

        company,

        companyImage,

        companyImagePublicId,

        location,

        experience,

        jobType,

        salary,

        lastDate,

        description,

        whoCanApply,

        requiredSkills,

        hiringEmail,

        originalPostUrl,

        isVerified,

        isActive,

      } = req.body;


      if (title !== undefined && title.trim()) {
        job.title = title.trim();
      }

      if (slug !== undefined && slug.trim()) {
        job.slug = slug.toLowerCase().trim();
      }

      if (company !== undefined && company.trim()) {
        job.company = company.trim();
      }

      if (companyImage !== undefined) {
        job.companyImage = companyImage;
      }

      if (companyImagePublicId !== undefined) {
        job.companyImagePublicId = companyImagePublicId;
      }

      if (location !== undefined) {
        job.location = location;
      }

      if (experience !== undefined) {
        job.experience = experience;
      }

      if (jobType !== undefined) {
        job.jobType = jobType;
      }

      if (salary !== undefined) {
        job.salary = salary;
      }

      if (lastDate !== undefined) {
        job.lastDate = lastDate;
      }

      if (description !== undefined) {
        job.description = description;
      }

      if (whoCanApply !== undefined) {
        job.whoCanApply = whoCanApply;
      }

      if (requiredSkills !== undefined) {
        job.requiredSkills = requiredSkills;
      }

      if (hiringEmail !== undefined && hiringEmail.trim()) {
        job.hiringEmail = hiringEmail.trim();
      }

      if (originalPostUrl !== undefined) {
        job.originalPostUrl = originalPostUrl;
      }

      if (isVerified !== undefined) {
        job.isVerified = isVerified;
      }

      if (isActive !== undefined) {
        job.isActive = isActive;
      }


      await job.save();


      res.status(200).json({

        message:
          "Job updated successfully",

        job,

      });

    } catch (error) {

      console.error(
        "Update Direct Hiring Job Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update job",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE JOB
// ======================================

router.delete(
  "/:id",
  protectAdmin,
  async (req, res) => {
    try {

      const job =
        await DirectHiringJob.findByIdAndDelete(
          req.params.id
        );


      if (!job) {

        return res.status(404).json({

          message:
            "Job not found",

        });

      }


      res.status(200).json({

        message:
          "Job deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete Direct Hiring Job Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete job",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;
