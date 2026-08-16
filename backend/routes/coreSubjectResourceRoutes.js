const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const CoreSubjectResource = require(
  "../models/CoreSubjectResource"
);

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
      folder:
        "nexthire/core-subject-resources",

      resource_type: "raw",

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
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed"
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
    fileSize:
      20 * 1024 * 1024,
  },
});


// ==================================================
// UPLOAD RESOURCE
// POST /api/core-subject-resources/upload
// ==================================================

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


      if (
        !title ||
        !category
      ) {
        return res.status(400).json({
          message:
            "Title and category are required",
        });
      }


      const categoryExists =
        await CoreSubjectCategory.findById(
          category
        );


      if (!categoryExists) {
        return res.status(404).json({
          message:
            "Core subject category not found",
        });
      }


      if (!req.file) {
        return res.status(400).json({
          message:
            "File is required",
        });
      }


      const extension =
        req.file.originalname
          .split(".")
          .pop()
          .toUpperCase();


      const resource =
        await CoreSubjectResource.create({

          title,

          description,

          category,

          resourceType:
            extension,

          fileUrl:
            req.file.path,

          fileName:
            req.file.originalname,

          fileSize: `${(
            req.file.size /
            (1024 * 1024)
          ).toFixed(2)} MB`,

          isPublished:
            true,

        });


      return res.status(201).json({

        message:
          "Core subject resource uploaded successfully",

        resource,

      });


    } catch (error) {

      console.error(
        "UPLOAD RESOURCE ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to upload core subject resource",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET ALL RESOURCES
// GET /api/core-subject-resources
// ==================================================

router.get(
  "/",

  async (req, res) => {
    try {

      const resources =
        await CoreSubjectResource.find({

          isPublished:
            true,

        })
          .populate(
            "category",
            "name slug"
          )
          .sort({

            createdAt:
              -1,

          });


      return res.status(200).json({

        resources,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject resources",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET RESOURCES BY CATEGORY
// GET /api/core-subject-resources/category/:categoryId
// ==================================================

router.get(
  "/category/:categoryId",

  async (req, res) => {
    try {

      const resources =
        await CoreSubjectResource.find({

          category:
            req.params.categoryId,

          isPublished:
            true,

        })
          .populate(
            "category",
            "name slug"
          )
          .sort({

            createdAt:
              -1,

          });


      return res.status(200).json({

        resources,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject resources",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// GET SINGLE RESOURCE BY ID
// ADMIN EDIT
// GET /api/core-subject-resources/id/:id
// ==================================================

router.get(
  "/id/:id",

  async (req, res) => {
    try {

      const resource =
        await CoreSubjectResource.findById(
          req.params.id
        ).populate(
          "category",
          "name slug"
        );


      if (!resource) {
        return res.status(404).json({

          message:
            "Core subject resource not found",

        });
      }


      return res.status(200).json({

        resource,

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to fetch core subject resource",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// UPDATE RESOURCE
// PUT /api/core-subject-resources/:id
// ==================================================

router.put(
  "/:id",

  upload.single("file"),

  async (req, res) => {
    try {

      const {
        title,
        description,
        category,
        isPublished,
      } = req.body;


      if (
        !title ||
        !category
      ) {
        return res.status(400).json({

          message:
            "Title and category are required",

        });
      }


      const resource =
        await CoreSubjectResource.findById(
          req.params.id
        );


      if (!resource) {
        return res.status(404).json({

          message:
            "Core subject resource not found",

        });
      }


      const categoryExists =
        await CoreSubjectCategory.findById(
          category
        );


      if (!categoryExists) {
        return res.status(404).json({

          message:
            "Core subject category not found",

        });
      }


      resource.title =
        title;

      resource.description =
        description;

      resource.category =
        category;


      if (
        isPublished !==
        undefined
      ) {
        resource.isPublished =
          isPublished ===
            "true" ||
          isPublished ===
            true;
      }


      // ==========================================
      // NEW FILE UPLOADED
      // ==========================================

      if (req.file) {

        const extension =
          req.file.originalname
            .split(".")
            .pop()
            .toUpperCase();


        resource.resourceType =
          extension;


        resource.fileUrl =
          req.file.path;


        resource.fileName =
          req.file.originalname;


        resource.fileSize =
          `${(
            req.file.size /
            (1024 * 1024)
          ).toFixed(2)} MB`;

      }


      await resource.save();


      return res.status(200).json({

        message:
          "Core subject resource updated successfully",

        resource,

      });


    } catch (error) {

      console.error(
        "UPDATE RESOURCE ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to update core subject resource",

        error:
          error.message,

      });

    }
  }
);


// ==================================================
// DELETE RESOURCE
// DELETE /api/core-subject-resources/:id
// ==================================================

router.delete(
  "/:id",

  async (req, res) => {
    try {

      const resource =
        await CoreSubjectResource.findByIdAndDelete(
          req.params.id
        );


      if (!resource) {
        return res.status(404).json({

          message:
            "Core subject resource not found",

        });
      }


      return res.status(200).json({

        message:
          "Core subject resource deleted successfully",

      });


    } catch (error) {

      return res.status(500).json({

        message:
          "Failed to delete core subject resource",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;