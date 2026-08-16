const express = require("express");

const router = express.Router();

const CareerNews = require(
  "../models/careerNewsModel"
);


// ======================================
// GET ALL ARTICLES (list page)
// ======================================

router.get(
  "/",
  async (req, res) => {
    try {

      const articles =
        await CareerNews.find({

          isPublished: true,

        })
          .sort({
            createdAt: -1,
          });


      res.status(200).json({

        articles,

      });

    } catch (error) {

      console.error(
        "Get Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch career news",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET MOST POPULAR (by view count)
// ======================================

router.get(
  "/popular",
  async (req, res) => {
    try {

      const limit =
        parseInt(req.query.limit) ||
        5;


      const articles =
        await CareerNews.find({

          isPublished: true,

        })
          .sort({
            viewCount: -1,
          })
          .limit(limit);


      res.status(200).json({

        articles,

      });

    } catch (error) {

      console.error(
        "Get Popular Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch popular career news",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET ALL ARTICLES — ADMIN (includes drafts)
// ======================================

router.get(
  "/admin/all",
  async (req, res) => {
    try {

      const articles =
        await CareerNews.find()
          .sort({
            createdAt: -1,
          });


      res.status(200).json({

        articles,

      });

    } catch (error) {

      console.error(
        "Get Admin Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch career news",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE ARTICLE (also increments view count)
// ======================================

router.get(
  "/:id",
  async (req, res) => {
    try {

      const article =
        await CareerNews.findByIdAndUpdate(

          req.params.id,

          {
            $inc: {
              viewCount: 1,
            },
          },

          {
            new: true,
          }

        );


      if (!article) {

        return res.status(404).json({

          message:
            "Article not found",

        });

      }


      res.status(200).json({

        article,

      });

    } catch (error) {

      console.error(
        "Get Career News Article Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to fetch article",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE ARTICLE
// ======================================

router.post(
  "/",
  async (req, res) => {
    try {

      const {

        title,

        slug,

        category,

        source,

        excerpt,

        content,

        thumbnailImage,

        thumbnailImagePublicId,

        isFeatured,

        isPublished,

      } = req.body;


      if (

        !title ||

        !title.trim()

      ) {

        return res.status(400).json({

          message:
            "Title is required",

        });

      }


      if (

        !content ||

        !content.trim()

      ) {

        return res.status(400).json({

          message:
            "Content is required",

        });

      }


      const normalizedSlug =

        slug &&

        slug.trim()

          ? slug
              .toLowerCase()
              .trim()

          : title
              .toLowerCase()
              .trim()
              .replace(

                /[^a-z0-9]+/g,

                "-"

              )
              .replace(

                /^-+|-+$/g,

                ""

              );


      const existingArticle =
        await CareerNews.findOne({

          slug:
            normalizedSlug,

        });


      if (existingArticle) {

        return res.status(400).json({

          message:
            "An article with this slug already exists",

        });

      }


      const article =
        await CareerNews.create({

          title:
            title.trim(),


          slug:
            normalizedSlug,


          category:
            category ||
            "General",


          source:
            source ||
            "",


          excerpt:
            excerpt ||
            "",


          content:
            content.trim(),


          thumbnailImage:
            thumbnailImage ||
            "",


          thumbnailImagePublicId:
            thumbnailImagePublicId ||
            "",


          isFeatured:
            isFeatured ||
            false,


          isPublished:

            isPublished !== undefined

              ? isPublished

              : true,

        });


      res.status(201).json({

        message:
          "Article created successfully",

        article,

      });

    } catch (error) {

      console.error(
        "Create Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to create article",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE ARTICLE
// ======================================

router.put(
  "/:id",
  async (req, res) => {
    try {

      const {

        title,

        slug,

        category,

        source,

        excerpt,

        content,

        thumbnailImage,

        thumbnailImagePublicId,

        isFeatured,

        isPublished,

      } = req.body;


      const article =
        await CareerNews.findById(

          req.params.id

        );


      if (!article) {

        return res.status(404).json({

          message:
            "Article not found",

        });

      }


      if (
        title !== undefined &&
        title.trim()
      ) {

        article.title =
          title.trim();

      }


      if (slug !== undefined) {

        article.slug =
          slug
            .toLowerCase()
            .trim() ||
          article.slug;

      }


      if (category !== undefined) {

        article.category =
          category;

      }


      if (source !== undefined) {

        article.source =
          source;

      }


      if (excerpt !== undefined) {

        article.excerpt =
          excerpt;

      }


      if (content !== undefined) {

        article.content =
          content;

      }


      if (thumbnailImage !== undefined) {

        article.thumbnailImage =
          thumbnailImage;

      }


      if (
        thumbnailImagePublicId !== undefined
      ) {

        article.thumbnailImagePublicId =
          thumbnailImagePublicId;

      }


      if (isFeatured !== undefined) {

        article.isFeatured =
          isFeatured;

      }


      if (isPublished !== undefined) {

        article.isPublished =
          isPublished;

      }


      await article.save();


      res.status(200).json({

        message:
          "Article updated successfully",

        article,

      });

    } catch (error) {

      console.error(
        "Update Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to update article",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE ARTICLE
// ======================================

router.delete(
  "/:id",
  async (req, res) => {
    try {

      const article =
        await CareerNews.findByIdAndDelete(

          req.params.id

        );


      if (!article) {

        return res.status(404).json({

          message:
            "Article not found",

        });

      }


      res.status(200).json({

        message:
          "Article deleted successfully",

      });

    } catch (error) {

      console.error(
        "Delete Career News Error:",
        error
      );


      res.status(500).json({

        message:
          "Failed to delete article",

        error:
          error.message,

      });

    }
  }
);


module.exports =
  router;
