const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const TechStackCategory = require("../models/TechStackCategory");

const router = express.Router();


// ==================================================
// CLOUDINARY STORAGE
// ==================================================

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "nexthire/tech-stack-categories",

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
// POST /api/tech-stack-categories
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
        await TechStackCategory.findOne({
          slug,
        });


      if (existingCategory) {
        return res.status(400).json({
          message:
            "Tech stack category already exists",
        });
      }


      const category =
        await TechStackCategory.create({

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
          "Tech stack category created successfully",

        category,

      });


    } catch (error) {

      console.error(
        "CREATE CATEGORY ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to create tech stack category",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET ALL CATEGORIES
// GET /api/tech-stack-categories
// ==================================================

router.get("/", 
    async (req, res) => {

    try {

      const categories =
        await TechStackCategory.find({

          isPublished: true,

        }).sort({

          createdAt: -1,

        });


      return res.status(200).json({

        categories,

      });


    } catch (error) {

      console.error(
        "GET ALL CATEGORIES ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to fetch tech stack categories",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// GET SINGLE CATEGORY BY ID
// IMPORTANT FOR ADMIN EDIT
// GET /api/tech-stack-categories/id/:id
// ==================================================

router.get(
  "/id/:id",

  async (req, res) => {

    try {

      const category =
        await TechStackCategory.findById(
          req.params.id
        );


      if (!category) {

        return res.status(404).json({

          message:
            "Tech stack category not found",

        });

      }


      return res.status(200).json({

        category,

      });


    } catch (error) {

      console.error(
        "GET CATEGORY BY ID ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to fetch tech stack category",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// GET SINGLE CATEGORY BY SLUG
// IMPORTANT FOR PUBLIC PAGE
// GET /api/tech-stack-categories/:slug
// ==================================================

router.get(
  "/:slug",

  async (req, res) => {

    try {

      const category =
        await TechStackCategory.findOne({

          slug:
            req.params.slug,

          isPublished: true,

        });


      if (!category) {

        return res.status(404).json({

          message:
            "Tech stack category not found",

        });

      }


      return res.status(200).json({

        category,

      });


    } catch (error) {

      console.error(
        "GET CATEGORY BY SLUG ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to fetch tech stack category",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// UPDATE CATEGORY
// PUT /api/tech-stack-categories/:id
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
      } = req.body;


      if (!name || !slug) {

        return res.status(400).json({

          message:
            "Name and slug are required",

        });

      }


      const category =
        await TechStackCategory.findById(
          req.params.id
        );


      if (!category) {

        return res.status(404).json({

          message:
            "Tech stack category not found",

        });

      }


      const duplicateCategory =
        await TechStackCategory.findOne({

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


      if (req.file) {

        category.imageUrl =
          req.file.path;

      }


      await category.save();


      return res.status(200).json({

        message:
          "Tech stack category updated successfully",

        category,

      });


    } catch (error) {

      console.error(
        "UPDATE CATEGORY ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to update tech stack category",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// DELETE CATEGORY
// DELETE /api/tech-stack-categories/:id
// ==================================================

router.delete(
  "/:id",

  async (req, res) => {

    try {

      const category =
        await TechStackCategory.findByIdAndDelete(
          req.params.id
        );


      if (!category) {

        return res.status(404).json({

          message:
            "Tech stack category not found",

        });

      }


      return res.status(200).json({

        message:
          "Tech stack category deleted successfully",

      });


    } catch (error) {

      console.error(
        "DELETE CATEGORY ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to delete tech stack category",

        error:
          error.message,

      });

    }

  }
);


module.exports = router;
