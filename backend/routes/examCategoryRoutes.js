const express = require("express");

const ExamCategory = require(
  "../models/ExamCategory"
);

const router = express.Router();


// ===============================
// GET ALL EXAMS OF GOVERNMENT CATEGORY
// ===============================

router.get(
  "/:governmentCategoryId/exams",
  async (req, res) => {
    try {

      const exams =
        await ExamCategory.find({

          governmentCategory:
            req.params.governmentCategoryId,

        }).sort({

          createdAt: -1,

        });


      res.status(200).json({

        exams,

      });

    } catch (error) {

      console.error(

        "Fetch Government Exams Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to fetch exams",

        error:
          error.message,

      });

    }

  }

);


// ===============================
// GET ALL EXAMS OF NOTES CATEGORY
// ===============================

router.get(

  "/notes/:categoryId",

  async (req, res) => {

    try {

      const exams =
        await ExamCategory.find({

          governmentNotesCategory:
            req.params.categoryId,

        }).sort({

          createdAt: -1,

        });


      res.status(200).json({

        exams,

      });

    } catch (error) {

      console.error(

        "Fetch Notes Exams Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to fetch notes exams",

        error:
          error.message,

      });

    }

  }

);


// ===============================
// ADD NEW EXAM
// ===============================

router.post(

  "/",

  async (req, res) => {

    try {

      const {

        governmentCategory,

        governmentNotesCategory,

        name,

        slug,

        description,

        icon,

        image,

        imagePublicId,

        gradient,

        isActive,

      } = req.body;


      // At least one parent category required

      if (

        !governmentCategory &&

        !governmentNotesCategory

      ) {

        return res.status(400).json({

          message:
            "Government category or government notes category is required",

        });

      }


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


      // ===============================
      // CHECK DUPLICATE EXAM
      // ===============================

      const duplicateQuery =
        governmentNotesCategory

          ? {

              governmentNotesCategory,

              slug,

            }

          : {

              governmentCategory,

              slug,

            };


      const existingExam =
        await ExamCategory.findOne(

          duplicateQuery

        );


      if (existingExam) {

        return res.status(400).json({

          message:
            "This exam already exists in this category",

        });

      }


      // ===============================
      // CREATE EXAM
      // ===============================

      const exam =
        await ExamCategory.create({

          governmentCategory:
            governmentCategory || undefined,

          governmentNotesCategory:
            governmentNotesCategory || undefined,

          name,

          slug,

          description,

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

            "from-blue-500 to-indigo-600",

          isActive:

            isActive !== undefined

              ? isActive

              : true,

        });


      res.status(201).json({

        message:
          "Exam created successfully",

        exam,

      });

    } catch (error) {

      console.error(

        "Create Exam Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to create exam",

        error:
          error.message,

      });

    }

  }

);


// ===============================
// UPDATE EXAM
// ===============================

router.put(

  "/:id",

  async (req, res) => {

    try {

      const exam =

        await ExamCategory.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

            runValidators: true,

          }

        );


      if (!exam) {

        return res.status(404).json({

          message:
            "Exam not found",

        });

      }


      res.status(200).json({

        message:
          "Exam updated successfully",

        exam,

      });

    } catch (error) {

      console.error(

        "Update Exam Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to update exam",

        error:
          error.message,

      });

    }

  }

);


// ===============================
// DELETE EXAM
// ===============================

router.delete(

  "/:id",

  async (req, res) => {

    try {

      const exam =

        await ExamCategory.findByIdAndDelete(

          req.params.id

        );


      if (!exam) {

        return res.status(404).json({

          message:
            "Exam not found",

        });

      }


      res.status(200).json({

        message:
          "Exam deleted successfully",

      });

    } catch (error) {

      console.error(

        "Delete Exam Error:",

        error

      );


      res.status(500).json({

        message:
          "Failed to delete exam",

        error:
          error.message,

      });

    }

  }

);


module.exports = router;