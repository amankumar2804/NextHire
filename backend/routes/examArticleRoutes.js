const express = require("express");

const ExamArticle = require(
  "../models/ExamArticle"
);

const GovernmentExamCategory = require(
  "../models/governmentExamCategoryModel"
);

const ExamCategory = require(
  "../models/ExamCategory"
);

const router = express.Router();


// =====================================
// GET PUBLIC PUBLISHED ARTICLES
// =====================================

router.get(
  "/public/:categorySlug/:examSlug",
  async (req, res) => {
    try {
      const category =
        await GovernmentExamCategory.findOne({
          slug:
            req.params.categorySlug,

          isActive:
            true,
        });

      if (!category) {
        return res.status(404).json({
          message:
            "Category not found",
        });
      }


      const exam =
        await ExamCategory.findOne({
          governmentCategory:
            category._id,

          slug:
            req.params.examSlug,

          isActive:
            true,
        });

      if (!exam) {
        return res.status(404).json({
          message:
            "Exam not found",
        });
      }


      const articles =
        await ExamArticle.find({
          exam:
            exam._id,

          isPublished:
            true,
        }).sort({
          createdAt:
            -1,
        });


      return res.status(200).json({
        exam,
        articles,
      });

    } catch (error) {
      console.error(
        "Public Articles Error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch exam articles",

        error:
          error.message,
      });
    }
  }
);


// =====================================
// GET ALL ARTICLES OF ONE EXAM
// =====================================

router.get(
  "/exam/:examId",
  async (req, res) => {
    try {
      const articles =
        await ExamArticle.find({
          exam:
            req.params.examId,
        }).sort({
          createdAt:
            -1,
        });


      return res.status(200).json({
        articles,
      });

    } catch (error) {
      console.error(
        "Fetch Articles Error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch articles",

        error:
          error.message,
      });
    }
  }
);


// =====================================
// CREATE ARTICLE
// =====================================

router.post(
  "/",
  async (req, res) => {
    try {
      const {
        exam,
        title,
        contentType,
        content,
        image,
        isPublished,
      } = req.body;


      // Required validation

      if (
        !exam ||
        !title ||
        !title.trim() ||
        !content ||
        !content.trim()
      ) {
        return res.status(400).json({
          message:
            "Exam, title and article content are required",
        });
      }


      // Image required only for image + article

      if (
        contentType ===
          "image-and-article" &&
        !image
      ) {
        return res.status(400).json({
          message:
            "An image is required for image + article",
        });
      }


      const article =
        await ExamArticle.create({
          exam,

          title:
            title.trim(),

          contentType:
            contentType ||
            "article",

          content:
            content.trim(),

          image:
            image || "",

          isPublished:
            isPublished !== false,
        });


      return res.status(201).json({
        message:
          "Article created successfully",

        article,
      });

    } catch (error) {
      console.error(
        "Create Article Error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create article",

        error:
          error.message,
      });
    }
  }
);


// =====================================
// UPDATE ARTICLE
// =====================================

router.put(
  "/:id",
  async (req, res) => {
    try {
      const {
        title,
        contentType,
        content,
        image,
        isPublished,
      } = req.body;


      if (
        !title ||
        !title.trim() ||
        !content ||
        !content.trim()
      ) {
        return res.status(400).json({
          message:
            "Article title and content are required",
        });
      }


      if (
        contentType ===
          "image-and-article" &&
        !image
      ) {
        return res.status(400).json({
          message:
            "An image is required for image + article",
        });
      }


      const article =
        await ExamArticle.findByIdAndUpdate(
          req.params.id,
          {
            title:
              title.trim(),

            contentType:
              contentType ||
              "article",

            content:
              content.trim(),

            image:
              image || "",

            isPublished:
              isPublished !== false,
          },
          {
            new:
              true,

            runValidators:
              true,
          }
        );


      if (!article) {
        return res.status(404).json({
          message:
            "Article not found",
        });
      }


      return res.status(200).json({
        message:
          "Article updated successfully",

        article,
      });

    } catch (error) {
      console.error(
        "Update Article Error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to update article",

        error:
          error.message,
      });
    }
  }
);


// =====================================
// DELETE ARTICLE
// =====================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const article =
        await ExamArticle.findByIdAndDelete(
          req.params.id
        );


      if (!article) {
        return res.status(404).json({
          message:
            "Article not found",
        });
      }


      return res.status(200).json({
        message:
          "Article deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete Article Error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to delete article",

        error:
          error.message,
      });
    }
  }
);


module.exports = router;