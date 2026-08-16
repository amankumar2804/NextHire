const User = require("../models/User");
const Job = require("../models/Job");


// ===============================
// CREATE JOB
// ===============================

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      slug,
      category,
      sector,
      location,
      experience,
      jobType,
      salary,
      description,
      eligibility,
      skills,
      lastDate,
      applyUrl,
      verified,
      hiringType,
      applicationEmail,
      sourceUrl,
      companyImage,
      companyImagePublicId,
      referralContacts,
      isActive,
      notificationPdf,
      notificationPdfPublicId,
      totalVacancies,
      applicationFee,
      examDate,
    } = req.body;

    if (
      !title ||
      !company ||
      !category ||
      !location ||
      !experience ||
      !jobType ||
      !description
    ) {
      return res.status(400).json({
        message: "Required job details are missing",
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

    const existingJob = await Job.findOne({ slug: normalizedSlug });

    if (existingJob) {
      return res.status(400).json({
        message: "Job with this slug already exists",
      });
    }

    const job = await Job.create({
      title,
      company,
      slug: normalizedSlug,
      category,
      sector: sector || "Private",
      location,
      experience,
      jobType,
      salary,
      description,
      eligibility,
      skills,
      lastDate,
      applyUrl,
      verified: verified !== undefined ? verified : true,
      hiringType,
      applicationEmail,
      sourceUrl,
      companyImage: companyImage || "",
      companyImagePublicId: companyImagePublicId || "",
      referralContacts: (referralContacts || []).slice(0, 3),
      isActive: isActive !== undefined ? isActive : true,
      notificationPdf: notificationPdf || "",
      notificationPdfPublicId: notificationPdfPublicId || "",
      totalVacancies: totalVacancies || "",
      applicationFee: applicationFee || "",
      examDate: examDate || "",
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    console.error("Create Job Error:", error);

    res.status(500).json({
      message: "Failed to create job",
    });
  }
};


// ===============================
// GET REGULAR JOBS (public — Private / Government pages)
// ===============================

const getRegularJobs = async (req, res) => {
  try {
    const { sector } = req.query;

    const filter = {
      hiringType: {
        $ne: "direct-hiring",
      },
      isActive: true,
    };

    if (sector) {
      filter.sector = sector;
    }

    const jobs = await Job.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      jobs,
    });

  } catch (error) {
    console.error("Get Regular Jobs Error:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};


// ===============================
// GET ALL JOBS — ADMIN (includes inactive, excludes direct-hiring)
// ===============================

const getAdminAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      hiringType: { $ne: "direct-hiring" },
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      jobs,
    });

  } catch (error) {
    console.error("Get Admin Jobs Error:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};


// ===============================
// GET SINGLE JOB BY ID (admin — for edit form)
// ===============================

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });

  } catch (error) {
    console.error("Get Job By Id Error:", error);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};


// ===============================
// GET SINGLE JOB BY SLUG
// ===============================

const getJobBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const job = await Job.findOne({
      slug,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });

  } catch (error) {
    console.error("Get Job By Slug Error:", error);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};


// ===============================
// UPDATE JOB
// ===============================

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const {
      title,
      company,
      slug,
      category,
      sector,
      location,
      experience,
      jobType,
      salary,
      description,
      eligibility,
      skills,
      lastDate,
      applyUrl,
      verified,
      companyImage,
      companyImagePublicId,
      referralContacts,
      isActive,
      notificationPdf,
      notificationPdfPublicId,
      totalVacancies,
      applicationFee,
      examDate,
    } = req.body;

    if (title !== undefined) job.title = title;
    if (company !== undefined) job.company = company;
    if (slug !== undefined && slug.trim()) job.slug = slug.toLowerCase().trim();
    if (category !== undefined) job.category = category;
    if (sector !== undefined) job.sector = sector;
    if (location !== undefined) job.location = location;
    if (experience !== undefined) job.experience = experience;
    if (jobType !== undefined) job.jobType = jobType;
    if (salary !== undefined) job.salary = salary;
    if (description !== undefined) job.description = description;
    if (eligibility !== undefined) job.eligibility = eligibility;
    if (skills !== undefined) job.skills = skills;
    if (lastDate !== undefined) job.lastDate = lastDate;
    if (applyUrl !== undefined) job.applyUrl = applyUrl;
    if (verified !== undefined) job.verified = verified;
    if (companyImage !== undefined) job.companyImage = companyImage;
    if (companyImagePublicId !== undefined) job.companyImagePublicId = companyImagePublicId;
    if (referralContacts !== undefined) job.referralContacts = referralContacts.slice(0, 3);
    if (isActive !== undefined) job.isActive = isActive;
    if (notificationPdf !== undefined) job.notificationPdf = notificationPdf;
    if (notificationPdfPublicId !== undefined) job.notificationPdfPublicId = notificationPdfPublicId;
    if (totalVacancies !== undefined) job.totalVacancies = totalVacancies;
    if (applicationFee !== undefined) job.applicationFee = applicationFee;
    if (examDate !== undefined) job.examDate = examDate;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    console.error("Update Job Error:", error);

    res.status(500).json({
      message: "Failed to update job",
    });
  }
};


// ===============================
// DELETE JOB
// ===============================

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    console.error("Delete Job Error:", error);

    res.status(500).json({
      message: "Failed to delete job",
    });
  }
};


// ===============================
// SAVE JOB
// ===============================

const saveJob = async (req, res) => {
  try {
    const {
      jobId,
      title,
      company,
      slug,
    } = req.body;

    if (!jobId || !title || !company || !slug) {
      return res.status(400).json({
        message: "Job details are required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadySaved = user.savedJobs.some(
      (job) => job.jobId === jobId
    );

    if (alreadySaved) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    user.savedJobs.push({
      jobId,
      title,
      company,
      slug,
    });

    await user.save();

    res.status(201).json({
      message: "Job saved successfully",
      savedJobs: user.savedJobs,
    });

  } catch (error) {
    console.error("Save Job Error:", error);

    res.status(500).json({
      message: "Failed to save job",
    });
  }
};


// ===============================
// CHECK SAVED JOB
// ===============================

const checkSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const saved = user.savedJobs.some(
      (job) => job.jobId === jobId
    );

    res.status(200).json({
      saved,
    });

  } catch (error) {
    console.error("Check Saved Job Error:", error);

    res.status(500).json({
      message: "Failed to check saved job",
    });
  }
};


// ===============================
// GET ALL SAVED JOBS
// ===============================

const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      savedJobs: user.savedJobs,
    });

  } catch (error) {
    console.error("Get Saved Jobs Error:", error);

    res.status(500).json({
      message: "Failed to fetch saved jobs",
    });
  }
};


// ===============================
// GET DIRECT HIRING JOBS
// ===============================

const getDirectHiringJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      hiringType: "direct-hiring",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      jobs,
    });

  } catch (error) {
    console.error("Get Direct Hiring Jobs Error:", error);

    res.status(500).json({
      message: "Failed to fetch direct hiring jobs",
    });
  }
};


// ===============================
// EXPORTS
// ===============================

module.exports = {
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
};
