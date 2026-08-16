const express = require("express");

const router = express.Router();

const ResumeTip = require("../models/resumeTipModel");


// ======================================
// GET ALL TIPS (published only)
// ======================================

router.get(
  "/",
  async (req, res) => {
    try {

      const tips =
        await ResumeTip.find({
          isPublished: true,
        }).sort({ createdAt: -1 });


      res.status(200).json({

        tips,

      });

    } catch (error) {

      console.error(
        "Get Resume Tips Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch resume tips",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET MOST POPULAR
// ======================================

router.get(
  "/popular",
  async (req, res) => {
    try {

      const limit =
        parseInt(req.query.limit) || 5;


      const tips =
        await ResumeTip.find({
          isPublished: true,
        })
          .sort({ viewCount: -1 })
          .limit(limit);


      res.status(200).json({

        tips,

      });

    } catch (error) {

      console.error(
        "Get Popular Resume Tips Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch popular resume tips",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET ALL TIPS — ADMIN (includes drafts)
// ======================================

router.get(
  "/admin/all",
  async (req, res) => {
    try {

      const tips =
        await ResumeTip.find().sort({
          createdAt: -1,
        });


      res.status(200).json({

        tips,

      });

    } catch (error) {

      console.error(
        "Get Admin Resume Tips Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch resume tips",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE TIP (increments view count)
// ======================================

router.get(
  "/:id",
  async (req, res) => {
    try {

      const tip =
        await ResumeTip.findByIdAndUpdate(

          req.params.id,

          { $inc: { viewCount: 1 } },

          { new: true }

        );


      if (!tip) {

        return res.status(404).json({

          message:
            "Tip not found",

        });

      }


      res.status(200).json({

        tip,

      });

    } catch (error) {

      console.error(
        "Get Resume Tip Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch tip",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE TIP
// ======================================

router.post(
  "/",
  async (req, res) => {
    try {

      const {

        title,

        slug,

        category,

        excerpt,

        content,

        thumbnailImage,

        thumbnailImagePublicId,

        isFeatured,

        isPublished,

      } = req.body;


      if (!title || !title.trim()) {

        return res.status(400).json({

          message:
            "Title is required",

        });

      }


      if (!content || !content.trim()) {

        return res.status(400).json({

          message:
            "Content is required",

        });

      }


      const normalizedSlug =

        slug && slug.trim()

          ? slug.toLowerCase().trim()

          : title
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");


      const existingTip =
        await ResumeTip.findOne({
          slug: normalizedSlug,
        });


      if (existingTip) {

        return res.status(400).json({

          message:
            "A tip with this slug already exists",

        });

      }


      const tip =
        await ResumeTip.create({

          title: title.trim(),

          slug: normalizedSlug,

          category:
            category || "General",

          excerpt:
            excerpt || "",

          content:
            content.trim(),

          thumbnailImage:
            thumbnailImage || "",

          thumbnailImagePublicId:
            thumbnailImagePublicId || "",

          isFeatured:
            isFeatured || false,

          isPublished:

            isPublished !== undefined

              ? isPublished

              : true,

        });


      res.status(201).json({

        message:
          "Tip created successfully",

        tip,

      });

    } catch (error) {

      console.error(
        "Create Resume Tip Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create tip",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE TIP
// ======================================

router.put(
  "/:id",
  async (req, res) => {
    try {

      const tip =
        await ResumeTip.findById(
          req.params.id
        );


      if (!tip) {

        return res.status(404).json({

          message:
            "Tip not found",

        });

      }


      const {

        title,

        slug,

        category,

        excerpt,

        content,

        thumbnailImage,

        thumbnailImagePublicId,

        isFeatured,

        isPublished,

      } = req.body;


      if (title !== undefined && title.trim()) {
        tip.title = title.trim();
      }

      if (slug !== undefined) {
        tip.slug =
          slug.toLowerCase().trim() ||
          tip.slug;
      }

      if (category !== undefined) {
        tip.category = category;
      }

      if (excerpt !== undefined) {
        tip.excerpt = excerpt;
      }

      if (content !== undefined) {
        tip.content = content;
      }

      if (thumbnailImage !== undefined) {
        tip.thumbnailImage = thumbnailImage;
      }

      if (thumbnailImagePublicId !== undefined) {
        tip.thumbnailImagePublicId =
          thumbnailImagePublicId;
      }

      if (isFeatured !== undefined) {
        tip.isFeatured = isFeatured;
      }

      if (isPublished !== undefined) {
        tip.isPublished = isPublished;
      }


      await tip.save();


      res.status(200).json({

        message:
          "Tip updated successfully",

        tip,

      });

    } catch (error) {

      console.error(
        "Update Resume Tip Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update tip",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE TIP
// ======================================

router.delete(
  "/:id",
  async (req, res) => {
    try {

      const tip =
        await ResumeTip.findByIdAndDelete(
          req.params.id
        );


      if (!tip) {

        return res.status(404).json({

          message:
            "Tip not found",

        });

      }


      res.status(200).json({

        message:
          "Tip deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete Resume Tip Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete tip",

        error:
          error.message,

      });

    }
  }
);


module.exports = router;
