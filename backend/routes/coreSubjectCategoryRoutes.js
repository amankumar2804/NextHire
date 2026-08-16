const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const CoreSubjectCategory = require(
  "../models/CoreSubjectCategory"
);

const router = express.Router();


// ==================================================
// CLOUDINARY STORAGE
// ==================================================

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "nexthire/core-subject-categories",

      resource_type: "image",

      public_id: `${Date.now()}-${file.originalname
        .replace(/\s+/g, "-")
        .replace(/\.[^/.]+$/, "")}`,

      format: file.originalname
        .split(".")
        .pop()
        .toLowerCase(),
    };
  },
});


// ==================================================
// FILE FILTER
// ==================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      ),
      false
    );
  }
};


// ==================================================
// MULTER
// ==================================================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});


// ==================================================
// CREATE CATEGORY
// POST /api/core-subject-categories
// ==================================================

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {
    try {
      const {
        name,
        slug,
        description,
      } = req.body;


      if (!name || !slug) {
        return res.status(400).json({
          message:
            "Name and slug are required",
        });
      }


      const existingCategory =
        await CoreSubjectCategory.findOne({
          $or: [
            { name },
            { slug },
          ],
        });


      if (existingCategory) {
        return res.status(400).json({
          message:
            "Core subject category already exists",
        });
      }


      const category =
        await CoreSubjectCategory.create({

          name,

          slug,

          description,

          imageUrl:
            req.file
              ? req.file.path
              : "",

          isPublished: true,

        });


      return res.status(201).json({

        message:
          "Core subject category created successfully",

        category,

      });


    } catch (error) {

      console.error(
        "CREATE CORE SUBJECT CATEGORY ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to create core subject category",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET ALL CATEGORIES
// GET /api/core-subject-categories
// ==================================================

router.get(
  "/",

  async (req, res) => {
    try {

      const categories =
        await CoreSubjectCategory.find({

          isPublished: true,

        }).sort({

          createdAt: -1,

        });


      return res.status(200).json({

        categories,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject categories",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET SINGLE CATEGORY BY ID
// ADMIN EDIT
// GET /api/core-subject-categories/id/:id
// ==================================================

router.get(
  "/id/:id",

  async (req, res) => {
    try {

      const category =
        await CoreSubjectCategory.findById(
          req.params.id
        );


      if (!category) {
        return res.status(404).json({

          message:
            "Core subject category not found",

        });
      }


      return res.status(200).json({

        category,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject category",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET CATEGORY BY SLUG
// PUBLIC PAGE
// GET /api/core-subject-categories/slug/:slug
// ==================================================

router.get(
  "/slug/:slug",

  async (req, res) => {
    try {

      const category =
        await CoreSubjectCategory.findOne({

          slug:
            req.params.slug,

          isPublished: true,

        });


      if (!category) {
        return res.status(404).json({

          message:
            "Core subject category not found",

        });
      }


      return res.status(200).json({

        category,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject category",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// UPDATE CATEGORY
// PUT /api/core-subject-categories/:id
// ==================================================

router.put(
  "/:id",

  upload.single("image"),

  async (req, res) => {
    try {

      const {
        name,
        slug,
        description,
        isPublished,
      } = req.body;


      if (!name || !slug) {
        return res.status(400).json({

          message:
            "Name and slug are required",

        });
      }


      const category =
        await CoreSubjectCategory.findById(
          req.params.id
        );


      if (!category) {
        return res.status(404).json({

          message:
            "Core subject category not found",

        });
      }


      const duplicateCategory =
        await CoreSubjectCategory.findOne({

          slug,

          _id: {
            $ne:
              req.params.id,
          },

        });


      if (duplicateCategory) {
        return res.status(400).json({

          message:
            "Another category with this slug already exists",

        });
      }


      category.name =
        name;

      category.slug =
        slug;

      category.description =
        description;


      if (isPublished !== undefined) {
        category.isPublished =
          isPublished === "true" ||
          isPublished === true;
      }


      if (req.file) {
        category.imageUrl =
          req.file.path;
      }


      await category.save();


      return res.status(200).json({

        message:
          "Core subject category updated successfully",

        category,

      });


    } catch (error) {

      console.error(
        "UPDATE CORE SUBJECT CATEGORY ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to update core subject category",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// DELETE CATEGORY
// DELETE /api/core-subject-categories/:id
// ==================================================

router.delete(
  "/:id",

  async (req, res) => {
    try {

      const category =
        await CoreSubjectCategory.findByIdAndDelete(
          req.params.id
        );


      if (!category) {
        return res.status(404).json({

          message:
            "Core subject category not found",

        });
      }


      return res.status(200).json({

        message:
          "Core subject category deleted successfully",

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to delete core subject category",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;