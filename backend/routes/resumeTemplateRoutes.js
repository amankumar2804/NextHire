const express = require("express");

const router = express.Router();

const ResumeTemplate = require("../models/resumeTemplateModel");


// ======================================
// GET ALL ACTIVE TEMPLATES (public)
// ======================================

router.get(
  "/",
  async (req, res) => {
    try {

      const templates =
        await ResumeTemplate.find({
          isActive: true,
        }).sort({ createdAt: -1 });


      res.status(200).json({

        templates,

      });

    } catch (error) {

      console.error(
        "Get Resume Templates Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch templates",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET ALL TEMPLATES — ADMIN (includes inactive)
// ======================================

router.get(
  "/admin/all",
  async (req, res) => {
    try {

      const templates =
        await ResumeTemplate.find().sort({
          createdAt: -1,
        });


      res.status(200).json({

        templates,

      });

    } catch (error) {

      console.error(
        "Get Admin Resume Templates Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch templates",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE TEMPLATE
// ======================================

router.get(
  "/:id",
  async (req, res) => {
    try {

      const template =
        await ResumeTemplate.findById(
          req.params.id
        );


      if (!template) {

        return res.status(404).json({

          message:
            "Template not found",

        });

      }


      res.status(200).json({

        template,

      });

    } catch (error) {

      console.error(
        "Get Resume Template Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch template",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE TEMPLATE
// ======================================

router.post(
  "/",
  async (req, res) => {
    try {

      const {

        name,

        slug,

        description,

        thumbnailImage,

        thumbnailImagePublicId,

        layoutKey,

        gradient,

        isActive,

      } = req.body;


      if (!name || !name.trim()) {

        return res.status(400).json({

          message:
            "Template name is required",

        });

      }


      if (!layoutKey || !layoutKey.trim()) {

        return res.status(400).json({

          message:
            "Layout key is required",

        });

      }


      const normalizedSlug =

        slug && slug.trim()

          ? slug.toLowerCase().trim()

          : name
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");


      const existingTemplate =
        await ResumeTemplate.findOne({
          slug: normalizedSlug,
        });


      if (existingTemplate) {

        return res.status(400).json({

          message:
            "A template with this slug already exists",

        });

      }


      const template =
        await ResumeTemplate.create({

          name: name.trim(),

          slug: normalizedSlug,

          description:
            description || "",

          thumbnailImage:
            thumbnailImage || "",

          thumbnailImagePublicId:
            thumbnailImagePublicId || "",

          layoutKey:
            layoutKey.trim(),

          gradient:
            gradient ||
            "from-indigo-500 to-violet-600",

          isActive:

            isActive !== undefined

              ? isActive

              : true,

        });


      res.status(201).json({

        message:
          "Template created successfully",

        template,

      });

    } catch (error) {

      console.error(
        "Create Resume Template Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create template",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE TEMPLATE
// ======================================

router.put(
  "/:id",
  async (req, res) => {
    try {

      const template =
        await ResumeTemplate.findById(
          req.params.id
        );


      if (!template) {

        return res.status(404).json({

          message:
            "Template not found",

        });

      }


      const {

        name,

        slug,

        description,

        thumbnailImage,

        thumbnailImagePublicId,

        layoutKey,

        gradient,

        isActive,

      } = req.body;


      if (name !== undefined && name.trim()) {
        template.name = name.trim();
      }

      if (slug !== undefined) {
        template.slug =
          slug.toLowerCase().trim() ||
          template.slug;
      }

      if (description !== undefined) {
        template.description = description;
      }

      if (thumbnailImage !== undefined) {
        template.thumbnailImage = thumbnailImage;
      }

      if (thumbnailImagePublicId !== undefined) {
        template.thumbnailImagePublicId =
          thumbnailImagePublicId;
      }

      if (layoutKey !== undefined && layoutKey.trim()) {
        template.layoutKey = layoutKey.trim();
      }

      if (gradient !== undefined) {
        template.gradient = gradient;
      }

      if (isActive !== undefined) {
        template.isActive = isActive;
      }


      await template.save();


      res.status(200).json({

        message:
          "Template updated successfully",

        template,

      });

    } catch (error) {

      console.error(
        "Update Resume Template Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update template",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE TEMPLATE
// ======================================

router.delete(
  "/:id",
  async (req, res) => {
    try {

      const template =
        await ResumeTemplate.findByIdAndDelete(
          req.params.id
        );


      if (!template) {

        return res.status(404).json({

          message:
            "Template not found",

        });

      }


      res.status(200).json({

        message:
          "Template deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete Resume Template Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete template",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;
