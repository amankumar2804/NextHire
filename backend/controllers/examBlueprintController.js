const ExamBlueprint = require("../models/ExamBlueprint");

// CREATE EXAM BLUEPRINT
const createExamBlueprint = async (req, res) => {
  try {
    const {
      category,
      examName,
      slug,
      shortDescription,
      icon,
      image,
      articleContent,
      isPublished,
    } = req.body;

    if (
      !category ||
      !examName ||
      !slug ||
      !shortDescription ||
      !articleContent
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingExam = await ExamBlueprint.findOne({ slug });

    if (existingExam) {
      return res.status(400).json({
        success: false,
        message: "Exam with this slug already exists",
      });
    }

    const examBlueprint = await ExamBlueprint.create({
      category,
      examName,
      slug,
      shortDescription,
      icon,
      image,
      articleContent,
      isPublished: isPublished ?? false,
    });

    res.status(201).json({
      success: true,
      message: "Exam blueprint created successfully",
      data: examBlueprint,
    });
  } catch (error) {
    console.error("Create Exam Blueprint Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create exam blueprint",
      error: error.message,
    });
  }
};

// GET ALL EXAM BLUEPRINTS
const getAllExamBlueprints = async (req, res) => {
  try {
    const exams = await ExamBlueprint.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exam blueprints",
      error: error.message,
    });
  }
};

// GET PUBLISHED EXAM BLUEPRINTS
const getPublishedExamBlueprints = async (req, res) => {
  try {
    const exams = await ExamBlueprint.find({
      isPublished: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch published exam blueprints",
      error: error.message,
    });
  }
};

// GET SINGLE EXAM BY SLUG
const getExamBlueprintBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const exam = await ExamBlueprint.findOne({
      slug,
      isPublished: true,
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam blueprint not found",
      });
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exam blueprint",
      error: error.message,
    });
  }
};

// GET SINGLE EXAM BY ID
const getExamBlueprintById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await ExamBlueprint.findById(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam blueprint not found",
      });
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exam blueprint",
      error: error.message,
    });
  }
};

// UPDATE EXAM BLUEPRINT
const updateExamBlueprint = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExam = await ExamBlueprint.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam blueprint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam blueprint updated successfully",
      data: updatedExam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update exam blueprint",
      error: error.message,
    });
  }
};

// DELETE EXAM BLUEPRINT
const deleteExamBlueprint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await ExamBlueprint.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam blueprint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam blueprint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete exam blueprint",
      error: error.message,
    });
  }
};

// TOGGLE PUBLISH STATUS
const toggleExamBlueprintPublish = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await ExamBlueprint.findById(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam blueprint not found",
      });
    }

    exam.isPublished = !exam.isPublished;

    await exam.save();

    res.status(200).json({
      success: true,
      message: exam.isPublished
        ? "Exam blueprint published successfully"
        : "Exam blueprint unpublished successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update publish status",
      error: error.message,
    });
  }
};

module.exports = {
  createExamBlueprint,
  getAllExamBlueprints,
  getPublishedExamBlueprints,
  getExamBlueprintBySlug,
  getExamBlueprintById,
  updateExamBlueprint,
  deleteExamBlueprint,
  toggleExamBlueprintPublish,
};