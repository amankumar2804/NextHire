const ExamCategory = require("../models/ExamCategory");

// =====================================
// GET EXAMS BY GOVERNMENT CATEGORY
// =====================================

const getExamsByGovernmentCategory = async (req, res) => {
  try {
    const { governmentCategoryId } = req.params;

    const exams = await ExamCategory.find({
      governmentCategory: governmentCategoryId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      exams,
    });
  } catch (error) {
    console.error("Get Exams Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
    });
  }
};


// =====================================
// GET SINGLE EXAM
// =====================================

const getSingleExam = async (req, res) => {
  try {
    const exam = await ExamCategory.findById(
      req.params.id
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      exam,
    });
  } catch (error) {
    console.error("Get Single Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch exam",
    });
  }
};


// =====================================
// CREATE EXAM
// =====================================

const createExam = async (req, res) => {
  try {
    const {
      governmentCategory,
      name,
      slug,
      description,
      icon,
      image,
      imagePublicId,
      gradient,
      isActive,
    } = req.body;

    if (
      !governmentCategory ||
      !name ||
      !slug ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Government category, name, slug and description are required",
      });
    }

    const exam = await ExamCategory.create({
      governmentCategory,
      name,
      slug,
      description,
      icon,
      image,
      imagePublicId,
      gradient,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    console.error("Create Exam Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "This exam slug already exists in this category",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create exam",
    });
  }
};


// =====================================
// UPDATE EXAM
// =====================================

const updateExam = async (req, res) => {
  try {
    const exam = await ExamCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam,
    });
  } catch (error) {
    console.error("Update Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update exam",
    });
  }
};


// =====================================
// DELETE EXAM
// =====================================

const deleteExam = async (req, res) => {
  try {
    const exam = await ExamCategory.findByIdAndDelete(
      req.params.id
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Delete Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete exam",
    });
  }
};


module.exports = {
  getExamsByGovernmentCategory,
  getSingleExam,
  createExam,
  updateExam,
  deleteExam,
};