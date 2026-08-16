const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const RoadmapFile = require("../models/RoadmapFile");
const RoadmapCategory = require("../models/RoadmapCategory");

const router = express.Router();


// ===============================
// CLOUDINARY STORAGE
// ===============================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {
    return {
      folder: "nexthire/roadmaps",

      resource_type: "raw",

      public_id: `${Date.now()}-${file.originalname
        .replace(/\s+/g, "-")
        .replace(/\.[^/.]+$/, "")}`,

      format: file.originalname.split(".").pop(),
    };
  },
});


// ===============================
// FILE FILTER
// ===============================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF, JPG, JPEG and PNG files are allowed"),
      false
    );
  }
};


// ===============================
// MULTER
// ===============================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});


// ===============================
// ADD ROADMAP FILE
// ===============================

router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
      } = req.body;

      if (!title || !category || !req.file) {
        return res.status(400).json({
          message: "Title, category and file are required",
        });
      }

      const categoryExists =
        await RoadmapCategory.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          message: "Roadmap category not found",
        });
      }

      const extension = req.file.originalname
        .split(".")
        .pop()
        .toUpperCase();

      const roadmapFile = await RoadmapFile.create({
        title,

        description,

        category,

        fileUrl: req.file.path,

        fileName: req.file.originalname,

        fileType: extension,

        fileSize: `${(
          req.file.size /
          (1024 * 1024)
        ).toFixed(2)} MB`,
      });

      res.status(201).json({
        message: "Roadmap file uploaded successfully",

        roadmapFile,
      });

    } catch (error) {

      res.status(500).json({
        message: "Failed to upload roadmap file",

        error: error.message,
      });

    }
  }
);


// ===============================
// GET ALL FILES OF CATEGORY
// ===============================

router.get(
  "/category/:categoryId",

  async (req, res) => {
    try {

      const files = await RoadmapFile.find({
        category: req.params.categoryId,

        isPublished: true,
      })
        .populate(
          "category",
          "name slug"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        files,
      });

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch roadmap files",

        error: error.message,
      });

    }
  }
);


// ===============================
// GET ALL ROADMAP FILES
// ===============================

router.get(
  "/",

  async (req, res) => {
    try {

      const files = await RoadmapFile.find({
        isPublished: true,
      })
        .populate(
          "category",
          "name slug"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        files,
      });

    } catch (error) {

      res.status(500).json({
        message: "Failed to fetch roadmap files",

        error: error.message,
      });

    }
  }
);


// ===============================
// DELETE ROADMAP FILE
// ===============================

router.delete(
  "/:id",

  async (req, res) => {
    try {

      const file =
        await RoadmapFile.findByIdAndDelete(
          req.params.id
        );

      if (!file) {
        return res.status(404).json({
          message: "Roadmap file not found",
        });
      }

      res.status(200).json({
        message: "Roadmap file deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: "Failed to delete roadmap file",

        error: error.message,
      });

    }
  }
);


// ===============================
// UPLOAD ERROR HANDLER
// ===============================

router.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const providerError = error?.error || error;
  const message =
    error?.message ||
    providerError?.message ||
    "Roadmap file upload failed";

  console.error("Roadmap file upload error:", error);

  return res.status(error instanceof multer.MulterError ? 400 : 500).json({
    message,
    error: {
      name: providerError?.name || error?.name,
      code: providerError?.code || error?.code,
      httpCode: providerError?.http_code || error?.http_code,
    },
  });
});


module.exports = router;
