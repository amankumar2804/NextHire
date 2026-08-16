const DirectHiring = require("../models/DirectHiring");

// ===============================
// Generate Slug
// ===============================
const generateSlug = (title, company) => {
  return `${title}-${company}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// ===============================
// Create Direct Hiring Job
// ===============================
const createDirectHiringJob = async (req, res) => {
  try {
    const slug = generateSlug(req.body.title, req.body.company);

    const exists = await DirectHiring.findOne({ slug });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Job already exists.",
      });
    }

    const job = await DirectHiring.create({
      ...req.body,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Direct Hiring Job Added Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Latest Jobs
// ===============================
const getLatestDirectHiringJobs = async (req, res) => {
  try {
    const jobs = await DirectHiring.find({
      status: "Active",
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Featured Jobs
// ===============================
const getFeaturedJobs = async (req, res) => {
  try {
    const jobs = await DirectHiring.find({
      featured: true,
      status: "Active",
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// All Jobs
// ===============================
const getAllDirectHiringJobs = async (req, res) => {
  try {
    const jobs = await DirectHiring.find({
      status: "Active",
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Job By Slug
// ===============================
const getJobBySlug = async (req, res) => {
  try {
    const job = await DirectHiring.findOne({
      slug: req.params.slug,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.views += 1;

    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Related Jobs
// ===============================
const getRelatedJobs = async (req, res) => {
  try {
    const current = await DirectHiring.findOne({
      slug: req.params.slug,
    });

    if (!current) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const jobs = await DirectHiring.find({
      _id: { $ne: current._id },
      category: current.category,
      status: "Active",
    }).limit(4);

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Search Jobs
// ===============================
const searchJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await DirectHiring.find({
      status: "Active",
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          skills: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Job
// ===============================
const updateDirectHiringJob = async (req, res) => {
  try {
    const slug = generateSlug(req.body.title, req.body.company);

    const job = await DirectHiring.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        slug,
      },
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Job
// ===============================
const deleteDirectHiringJob = async (req, res) => {
  try {
    const job = await DirectHiring.findByIdAndDelete(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDirectHiringJob,
  getLatestDirectHiringJobs,
  getFeaturedJobs,
  getAllDirectHiringJobs,
  getJobBySlug,
  getRelatedJobs,
  searchJobs,
  updateDirectHiringJob,
  deleteDirectHiringJob,
};