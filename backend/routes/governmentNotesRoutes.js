const express = require("express");

const router = express.Router();

const GovernmentNotesCategory = require(
  "../models/governmentNotesCategoryModel"
);


// ======================================
// FIND CATEGORY + SUBJECT BY SUBJECT ID
// ======================================

const findCategoryBySubjectId =
  async (subjectId) => {

    const category =
      await GovernmentNotesCategory.findOne({

        "subjects._id":
          subjectId,

      });


    if (!category) {

      return {

        category:
          null,

        subject:
          null,

      };

    }


    const subject =
      category.subjects.id(
        subjectId
      );


    return {

      category,

      subject,

    };

  };


// ======================================
// GET ALL NOTES
// SHORT ROUTE
// GET /api/government-notes/:subjectId
// ======================================

router.get(
  "/:subjectId",
  async (req, res) => {

    try {

      const {

        category,

        subject,

      } =
        await findCategoryBySubjectId(

          req.params.subjectId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      return res.status(200).json({

        category: {

          _id:
            category._id,

          name:
            category.name,

          slug:
            category.slug,

        },


        subject,


        notes:
          Array.isArray(
            subject.notes
          )

            ? subject.notes

            : [],

      });

    } catch (error) {

      console.error(

        "Get Notes Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to fetch notes",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// CREATE NOTE
// SHORT ROUTE
// POST /api/government-notes/:subjectId
// ======================================

router.post(
  "/:subjectId",
  async (req, res) => {

    try {

      const {

        title,

        slug,

        description,

        content,

        image,

        imagePublicId,

        pdf,

        pdfPublicId,

        isPublished,

      } = req.body;


      if (

        !title ||

        !title.trim()

      ) {

        return res.status(400).json({

          message:
            "Note title is required",

        });

      }


      const {

        category,

        subject,

      } =
        await findCategoryBySubjectId(

          req.params.subjectId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      if (

        !Array.isArray(

          subject.notes

        )

      ) {

        subject.notes = [];

      }


      const generatedSlug =

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


      const existingNote =

        subject.notes.find(

          (note) =>

            note.slug ===

            generatedSlug

        );


      if (existingNote) {

        return res.status(400).json({

          message:
            "A note with this slug already exists",

        });

      }


      subject.notes.push({

        title:
          title.trim(),


        slug:
          generatedSlug,


        description:

          description

            ? description.trim()

            : "",


        content:

          content

            ? content.trim()

            : "",


        image:

          image ||

          "",


        imagePublicId:

          imagePublicId ||

          "",


        pdf:

          pdf ||

          "",


        pdfPublicId:

          pdfPublicId ||

          "",


        isPublished:

          isPublished !==
          undefined

            ? isPublished

            : true,


        createdAt:

          new Date(),


        updatedAt:

          new Date(),

      });


      await category.save();


      const createdNote =

        subject.notes[

          subject.notes.length - 1

        ];


      return res.status(201).json({

        message:
          "Note created successfully",


        note:
          createdNote,

      });

    } catch (error) {

      console.error(

        "Create Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to create note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// UPDATE NOTE (EDIT)
// SHORT ROUTE
// PUT /api/government-notes/:subjectId/notes/:noteId
// ======================================

router.put(
  "/:subjectId/notes/:noteId",
  async (req, res) => {

    try {

      const {

        title,

        slug,

        description,

        content,

        image,

        imagePublicId,

        pdf,

        pdfPublicId,

        isPublished,

      } = req.body;


      const {

        category,

        subject,

      } =
        await findCategoryBySubjectId(

          req.params.subjectId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      const note =
        subject.notes.id(
          req.params.noteId
        );


      if (!note) {

        return res.status(404).json({

          message:
            "Note not found",

        });

      }


      if (
        title !== undefined &&
        title.trim()
      ) {

        note.title =
          title.trim();

      }


      if (slug !== undefined) {

        note.slug =
          slug.trim() ||
          note.slug;

      }


      if (description !== undefined) {

        note.description =
          description.trim();

      }


      if (content !== undefined) {

        note.content =
          content.trim();

      }


      if (image !== undefined) {

        note.image = image;

      }


      if (imagePublicId !== undefined) {

        note.imagePublicId =
          imagePublicId;

      }


      if (pdf !== undefined) {

        note.pdf = pdf;

      }


      if (pdfPublicId !== undefined) {

        note.pdfPublicId =
          pdfPublicId;

      }


      if (isPublished !== undefined) {

        note.isPublished =
          isPublished;

      }


      note.updatedAt =
        new Date();


      await category.save();


      return res.status(200).json({

        message:
          "Note updated successfully",

        note,

      });

    } catch (error) {

      console.error(

        "Update Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to update note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// DELETE NOTE
// SHORT ROUTE
// DELETE /api/government-notes/:subjectId/notes/:noteId
// ======================================

router.delete(
  "/:subjectId/notes/:noteId",
  async (req, res) => {

    try {

      const {

        category,

        subject,

      } =
        await findCategoryBySubjectId(

          req.params.subjectId

        );


      if (!category) {

        return res.status(404).json({

          message:
            "Notes category not found",

        });

      }


      if (!subject) {

        return res.status(404).json({

          message:
            "Subject not found",

        });

      }


      const note =
        subject.notes.id(
          req.params.noteId
        );


      if (!note) {

        return res.status(404).json({

          message:
            "Note not found",

        });

      }


      note.deleteOne();


      await category.save();


      return res.status(200).json({

        message:
          "Note deleted successfully",

      });

    } catch (error) {

      console.error(

        "Delete Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to delete note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// GET ALL NOTES
// FULL ROUTE
// GET /:categoryId/subjects/:subjectId
// ======================================

router.get(
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


      return res.status(200).json({

        category: {

          _id:
            category._id,

          name:
            category.name,

          slug:
            category.slug,

        },


        subject,


        notes:

          Array.isArray(

            subject.notes

          )

            ? subject.notes

            : [],

      });

    } catch (error) {

      console.error(

        "Get Subject Notes Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to fetch notes",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// CREATE NOTE
// FULL ROUTE
// POST /:categoryId/subjects/:subjectId
// ======================================

router.post(
  "/:categoryId/subjects/:subjectId",
  async (req, res) => {

    try {

      const {

        title,

        slug,

        description,

        content,

        image,

        imagePublicId,

        pdf,

        pdfPublicId,

        isPublished,

      } = req.body;


      if (

        !title ||

        !title.trim()

      ) {

        return res.status(400).json({

          message:
            "Note title is required",

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

        !Array.isArray(

          subject.notes

        )

      ) {

        subject.notes = [];

      }


      const generatedSlug =

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


      const existingNote =

        subject.notes.find(

          (note) =>

            note.slug ===

            generatedSlug

        );


      if (existingNote) {

        return res.status(400).json({

          message:
            "A note with this slug already exists",

        });

      }


      subject.notes.push({

        title:
          title.trim(),

        slug:
          generatedSlug,

        description:

          description

            ? description.trim()

            : "",

        content:

          content

            ? content.trim()

            : "",

        image:

          image ||

          "",

        imagePublicId:

          imagePublicId ||

          "",

        pdf:

          pdf ||

          "",

        pdfPublicId:

          pdfPublicId ||

          "",

        isPublished:

          isPublished !==
          undefined

            ? isPublished

            : true,

        createdAt:

          new Date(),

        updatedAt:

          new Date(),

      });


      await category.save();


      const createdNote =

        subject.notes[

          subject.notes.length - 1

        ];


      return res.status(201).json({

        message:
          "Note created successfully",

        note:
          createdNote,

      });

    } catch (error) {

      console.error(

        "Create Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to create note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// UPDATE NOTE (EDIT)
// FULL ROUTE
// PUT /:categoryId/subjects/:subjectId/notes/:noteId
// ======================================

router.put(
  "/:categoryId/subjects/:subjectId/notes/:noteId",
  async (req, res) => {

    try {

      const {

        title,

        slug,

        description,

        content,

        image,

        imagePublicId,

        pdf,

        pdfPublicId,

        isPublished,

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


      const note =
        subject.notes.id(
          req.params.noteId
        );


      if (!note) {

        return res.status(404).json({

          message:
            "Note not found",

        });

      }


      if (
        title !== undefined &&
        title.trim()
      ) {

        note.title =
          title.trim();

      }


      if (slug !== undefined) {

        note.slug =
          slug.trim() ||
          note.slug;

      }


      if (description !== undefined) {

        note.description =
          description.trim();

      }


      if (content !== undefined) {

        note.content =
          content.trim();

      }


      if (image !== undefined) {

        note.image = image;

      }


      if (imagePublicId !== undefined) {

        note.imagePublicId =
          imagePublicId;

      }


      if (pdf !== undefined) {

        note.pdf = pdf;

      }


      if (pdfPublicId !== undefined) {

        note.pdfPublicId =
          pdfPublicId;

      }


      if (isPublished !== undefined) {

        note.isPublished =
          isPublished;

      }


      note.updatedAt =
        new Date();


      await category.save();


      return res.status(200).json({

        message:
          "Note updated successfully",

        note,

      });

    } catch (error) {

      console.error(

        "Update Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to update note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// DELETE NOTE
// FULL ROUTE
// DELETE /:categoryId/subjects/:subjectId/notes/:noteId
// ======================================

router.delete(
  "/:categoryId/subjects/:subjectId/notes/:noteId",
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


      const note =
        subject.notes.id(
          req.params.noteId
        );


      if (!note) {

        return res.status(404).json({

          message:
            "Note not found",

        });

      }


      note.deleteOne();


      await category.save();


      return res.status(200).json({

        message:
          "Note deleted successfully",

      });

    } catch (error) {

      console.error(

        "Delete Note Error:",

        error

      );


      return res.status(500).json({

        message:
          "Failed to delete note",

        error:
          error.message,

      });

    }

  }
);


// ======================================
// EXPORT
// ======================================

module.exports =
  router;
