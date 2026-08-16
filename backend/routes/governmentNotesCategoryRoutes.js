const express = require("express");

const router = express.Router();

const GovernmentNotesCategory =
  require(
    "../models/governmentNotesCategoryModel"
  );


// ======================================
// GET ALL NOTES CATEGORIES
// ======================================

router.get(
  "/",
  async (req, res) => {
    try {

      const categories =
        await GovernmentNotesCategory.find()
          .sort({
            createdAt: -1,
          });


      res.status(200).json({

        categories,

      });

    } catch (error) {

      console.error(

        "Get Government Notes Categories Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to fetch government notes categories",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET SINGLE NOTES CATEGORY
// ======================================

router.get(
  "/:id",
  async (req, res) => {
    try {

      const category =
        await GovernmentNotesCategory.findById(

          req.params.id

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Category not found",

        });

      }


      res.status(200).json({

        category,

      });

    } catch (error) {

      console.error(

        "Get Government Notes Category Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to fetch government notes category",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE NOTES CATEGORY
// ======================================

router.post(
  "/",
  async (req, res) => {
    try {

      const {

        name,

        slug,

        description,

        icon,

        image,

        imagePublicId,

        gradient,

        isFeatured,

        isActive,

      } = req.body;


      if (

        !name ||

        !slug ||

        !description

      ) {

        return res.status(400).json({

          message:
            "Name, slug and description are required",

        });

      }


      const normalizedSlug =
        slug
          .toLowerCase()
          .trim();


      const existingCategory =
        await GovernmentNotesCategory.findOne({

          slug:
            normalizedSlug,

        });


      if (existingCategory) {

        return res.status(400).json({

          message:
            "Category with this slug already exists",

        });

      }


      const category =
        await GovernmentNotesCategory.create({

          name:
            name.trim(),


          slug:
            normalizedSlug,


          description:
            description.trim(),


          icon:
            icon ||
            "📚",


          image:
            image ||
            "",


          imagePublicId:
            imagePublicId ||
            "",


          gradient:
            gradient ||
            "from-indigo-500 to-violet-600",


          isFeatured:
            isFeatured ||
            false,


          isActive:
            isActive !== undefined

              ? isActive

              : true,


          subjects:
            [],

        });


      res.status(201).json({

        message:
          "Government notes category created successfully",

        category,

      });

    } catch (error) {

      console.error(

        "Create Government Notes Category Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to create government notes category",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE NOTES CATEGORY
// ======================================

router.put(
  "/:id",
  async (req, res) => {
    try {

      const {

        name,

        slug,

        description,

        icon,

        image,

        imagePublicId,

        gradient,

        isFeatured,

        isActive,

      } = req.body;


      const category =
        await GovernmentNotesCategory.findById(

          req.params.id

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Category not found",

        });

      }


      if (
        name !== undefined
      ) {

        category.name =
          name.trim();

      }


      if (
        slug !== undefined
      ) {

        category.slug =
          slug
            .toLowerCase()
            .trim();

      }


      if (
        description !== undefined
      ) {

        category.description =
          description.trim();

      }


      if (
        icon !== undefined
      ) {

        category.icon =
          icon;

      }


      if (
        image !== undefined
      ) {

        category.image =
          image;

      }


      if (
        imagePublicId !== undefined
      ) {

        category.imagePublicId =
          imagePublicId;

      }


      if (
        gradient !== undefined
      ) {

        category.gradient =
          gradient;

      }


      if (
        isFeatured !== undefined
      ) {

        category.isFeatured =
          isFeatured;

      }


      if (
        isActive !== undefined
      ) {

        category.isActive =
          isActive;

      }


      await category.save();


      res.status(200).json({

        message:
          "Government notes category updated successfully",

        category,

      });

    } catch (error) {

      console.error(

        "Update Government Notes Category Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to update government notes category",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// GET ALL SUBJECTS
// ======================================

router.get(
  "/:categoryId/subjects",
  async (req, res) => {
    try {

      const category =
        await GovernmentNotesCategory.findById(

          req.params.categoryId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      res.status(200).json({

        subjects:
          category.subjects,

      });

    } catch (error) {

      console.error(

        "Get Subjects Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to fetch subjects",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// CREATE SUBJECT
// ======================================

router.post(
  "/:categoryId/subjects",
  async (req, res) => {
    try {

      const {

        name,

        slug,

        description,

        icon,

        image,

        imagePublicId,

        gradient,

        isActive,

      } = req.body;


      if (

        !name ||

        !slug

      ) {

        return res.status(400).json({

          message:
            "Subject name and slug are required",

        });

      }


      const category =
        await GovernmentNotesCategory.findById(

          req.params.categoryId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      const normalizedSlug =
        slug
          .toLowerCase()
          .trim();


      const existingSubject =
        category.subjects.find(

          (subject) =>

            subject.slug ===
            normalizedSlug

        );


      if (existingSubject) {

        return res.status(400).json({

          message:
            "Subject with this slug already exists",

        });

      }


      category.subjects.push({

        name:
          name.trim(),


        slug:
          normalizedSlug,


        description:
          description
            ? description.trim()
            : "",


        icon:
          icon ||
          "📚",


        image:
          image ||
          "",


        imagePublicId:
          imagePublicId ||
          "",


        gradient:
          gradient ||
          "from-indigo-500 to-violet-600",


        isActive:
          isActive !== undefined

            ? isActive

            : true,

      });


      await category.save();


      const createdSubject =
        category.subjects[

          category.subjects.length - 1

        ];


      res.status(201).json({

        message:
          "Subject created successfully",

        subject:
          createdSubject,

      });

    } catch (error) {

      console.error(

        "Create Subject Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to create subject",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// UPDATE SUBJECT
// ======================================

router.put(
  "/:categoryId/subjects/:subjectId",
  async (req, res) => {
    try {

      const {

        name,

        slug,

        description,

        icon,

        image,

        imagePublicId,

        gradient,

        isActive,

      } = req.body;


      const category =
        await GovernmentNotesCategory.findById(

          req.params.categoryId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      const subject =
        category.subjects.id(

          req.params.subjectId

        );


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      if (
        name !== undefined
      ) {

        subject.name =
          name.trim();

      }


      if (
        slug !== undefined
      ) {

        subject.slug =
          slug
            .toLowerCase()
            .trim();

      }


      if (
        description !== undefined
      ) {

        subject.description =
          description.trim();

      }


      if (
        icon !== undefined
      ) {

        subject.icon =
          icon;

      }


      if (
        image !== undefined
      ) {

        subject.image =
          image;

      }


      if (
        imagePublicId !== undefined
      ) {

        subject.imagePublicId =
          imagePublicId;

      }


      if (
        gradient !== undefined
      ) {

        subject.gradient =
          gradient;

      }


      if (
        isActive !== undefined
      ) {

        subject.isActive =
          isActive;

      }


      subject.updatedAt =
        new Date();


      await category.save();


      res.status(200).json({

        message:
          "Subject updated successfully",

        subject,

      });

    } catch (error) {

      console.error(

        "Update Subject Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to update subject",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE SUBJECT
// ======================================

router.delete(
  "/:categoryId/subjects/:subjectId",
  async (req, res) => {
    try {

      const category =
        await GovernmentNotesCategory.findById(

          req.params.categoryId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      const subject =
        category.subjects.id(

          req.params.subjectId

        );


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      subject.deleteOne();


      await category.save();


      res.status(200).json({

        message:
          "Subject deleted successfully",

      });

    } catch (error) {

      console.error(

        "Delete Subject Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to delete subject",

        error:
          error.message,

      });

    }
  }
);


// ======================================
// DELETE NOTES CATEGORY
// ======================================

router.delete(
  "/:id",
  async (req, res) => {
    try {

      const category =
        await GovernmentNotesCategory.findById(

          req.params.id

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Category not found",

        });

      }


      await GovernmentNotesCategory.findByIdAndDelete(

        req.params.id

      );


      res.status(200).json({

        message:
          "Government notes category deleted successfully",

      });

    } catch (error) {

      console.error(

        "Delete Government Notes Category Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to delete government notes category",

        error:
          error.message,

      });

    }
  }
);


module.exports =
  router;