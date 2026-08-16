const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const TechStackResource = require(
  "../models/TechStackResource"
);

const TechStackCategory = require(
  "../models/TechStackCategory"
);

const router = express.Router();


// ===============================
// CLOUDINARY STORAGE
// ===============================

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "nexthire/tech-stack-resources",

      resource_type: "raw",

      public_id: `${Date.now()}-${file.originalname
        .replace(/\s+/g, "-")
        .replace(/\.[^/.]+$/, "")}`,

      format: file.originalname
        .split(".")
        .pop(),
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
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed"
      ),
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
// ADD TECH STACK RESOURCE
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
        resourceType,
        article,
      } = req.body;


      if (
        !title ||
        !category ||
        !resourceType
      ) {
        return res.status(400).json({
          message:
            "Title, category and resourceType are required",
        });
      }


      const categoryExists =
        await TechStackCategory.findById(
          category
        );


      if (!categoryExists) {
        return res.status(404).json({
          message:
            "Tech stack category not found",
        });
      }


      // ===============================
      // ARTICLE RESOURCE
      // ===============================

      if (
        resourceType === "ARTICLE"
      ) {
        if (!article) {
          return res.status(400).json({
            message:
              "Article content is required",
          });
        }


        const resource =
          await TechStackResource.create({
            title,

            description,

            category,

            resourceType,

            article,

            isPublished: true,
          });


        return res.status(201).json({
          message:
            "Tech stack article created successfully",

          resource,
        });
      }


      // ===============================
      // FILE RESOURCE
      // ===============================

      if (!req.file) {
        return res.status(400).json({
          message:
            "File is required for this resource type",
        });
      }


      const extension =
        req.file.originalname
          .split(".")
          .pop()
          .toUpperCase();


      const resource =
        await TechStackResource.create({
          title,

          description,

          category,

          resourceType: extension,

          fileUrl: req.file.path,

          fileName:
            req.file.originalname,

          fileSize:
            `${(
              req.file.size /
              (1024 * 1024)
            ).toFixed(2)} MB`,

          isPublished: true,
        });


      res.status(201).json({
        message:
          "Tech stack resource uploaded successfully",

        resource,
      });


    } catch (error) {

      console.error(
        "TECH STACK RESOURCE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to create tech stack resource",

        error: error.message,
      });

    }
  }
);


// ===============================
// GET RESOURCES BY CATEGORY
// ===============================

router.get(
  "/category/:categoryId",

  async (req, res) => {
    try {

      const resources =
        await TechStackResource.find({
          category:
            req.params.categoryId,

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
        resources,
      });


    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch tech stack resources",

        error: error.message,
      });

    }
  }
);


// ===============================
// GET SINGLE RESOURCE BY ID
// IMPORTANT FOR READ ARTICLE
// ===============================

router.get(
  "/single/:id",

  async (req, res) => {
    try {

      const resource =
        await TechStackResource.findOne({
          _id: req.params.id,

          isPublished: true,
        })
          .populate(
            "category",
            "name slug"
          );


      if (!resource) {
        return res.status(404).json({
          message:
            "Tech stack resource not found",
        });
      }


      res.status(200).json({
        resource,
      });


    } catch (error) {

      console.error(
        "GET SINGLE RESOURCE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch tech stack resource",

        error: error.message,
      });

    }
  }
);


// ===============================
// GET ALL RESOURCES
// ===============================

router.get(
  "/",

  async (req, res) => {
    try {

      const resources =
        await TechStackResource.find({
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
        resources,
      });


    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch tech stack resources",

        error: error.message,
      });

    }
  }
);


// ===============================
// UPDATE TECH STACK RESOURCE
// ===============================

router.put(
  "/:id",

  upload.single("file"),

  async (req, res) => {
    try {

      const {
        title,
        description,
        category,
        resourceType,
        article,
      } = req.body;


      const resource =
        await TechStackResource.findById(
          req.params.id
        );


      if (!resource) {
        return res.status(404).json({
          message:
            "Tech stack resource not found",
        });
      }


      const categoryExists =
        await TechStackCategory.findById(
          category
        );


      if (!categoryExists) {
        return res.status(404).json({
          message:
            "Tech stack category not found",
        });
      }


      // ===============================
      // BASIC DATA
      // ===============================

      resource.title =
        title;

      resource.description =
        description;

      resource.category =
        category;


      // ===============================
      // ARTICLE UPDATE
      // ===============================

      if (
        resourceType === "ARTICLE"
      ) {

        resource.resourceType =
          "ARTICLE";

        resource.article =
          article || "";

        resource.fileUrl =
          undefined;

        resource.fileName =
          undefined;

        resource.fileSize =
          undefined;

      }


      // ===============================
      // FILE RESOURCE UPDATE
      // ===============================

      else {

        resource.resourceType =
          resourceType;


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

      }


      const updatedResource =
        await resource.save();


      await updatedResource.populate(
        "category",
        "name slug"
      );


      res.status(200).json({

        message:
          "Tech stack resource updated successfully",

        resource:
          updatedResource,

      });


    } catch (error) {

      console.error(
        "UPDATE TECH STACK RESOURCE ERROR:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update tech stack resource",

        error:
          error.message,

      });

    }

  }

);


// ===============================
// DELETE RESOURCE
// ===============================

router.delete(
  "/:id",

  async (req, res) => {
    try {

      const resource =
        await TechStackResource.findByIdAndDelete(
          req.params.id
        );


      if (!resource) {
        return res.status(404).json({
          message:
            "Tech stack resource not found",
        });
      }


      res.status(200).json({
        message:
          "Tech stack resource deleted successfully",
      });


    } catch (error) {

      res.status(500).json({
        message:
          "Failed to delete tech stack resource",

        error: error.message,
      });

    }
  }
);


module.exports = router;