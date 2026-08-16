const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();


// =====================================
// MULTER MEMORY STORAGE
// =====================================

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});


// =====================================
// UPLOAD IMAGE TO CLOUDINARY
// =====================================

router.post(
  "/image",

  upload.single("image"),

  async (req, res) => {
    try {

      if (!req.file) {

        return res.status(400).json({

          message:
            "Image is required",

        });

      }


      // Check image file

      if (
        !req.file.mimetype.startsWith(
          "image/"
        )
      ) {

        return res.status(400).json({

          message:
            "Please upload a valid image file",

        });

      }


      const uploadStream =

        cloudinary.uploader.upload_stream(

          {

            folder:
              "nexthire/interview-experiences",

            resource_type:
              "image",

          },


          (error, result) => {

            if (error) {

              console.error(

                "Cloudinary Image Upload Error:",

                error

              );


              return res.status(500).json({

                message:
                  "Image upload failed",

                error:
                  error.message,

              });

            }


            return res.status(200).json({

              message:
                "Image uploaded successfully",


              imageUrl:
                result.secure_url,


              imagePublicId:
                result.public_id,

            });

          }

        );


      uploadStream.end(

        req.file.buffer

      );


    } catch (error) {

      console.error(

        "Image Upload Error:",

        error

      );


      return res.status(500).json({

        message:
          "Image upload failed",

        error:
          error.message,

      });

    }

  }

);


// =====================================
// UPLOAD PDF TO CLOUDINARY
// =====================================

router.post(
  "/pdf",

  upload.single("pdf"),

  async (req, res) => {
    try {

      if (!req.file) {

        return res.status(400).json({

          message:
            "PDF file is required",

        });

      }


      // Check PDF file

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {

        return res.status(400).json({

          message:
            "Please upload a valid PDF file",

        });

      }


      const uploadStream =

        cloudinary.uploader.upload_stream(

          {

            folder:
              "nexthire/government-notes/pdfs",


            resource_type:
              "raw",


            public_id:
              `${Date.now()}-${req.file.originalname
                .replace(
                  /\.pdf$/i,
                  ""
                )
                .replace(
                  /[^a-zA-Z0-9-_]/g,
                  "-"
                )}`,

          },


          (error, result) => {

            if (error) {

              console.error(

                "Cloudinary PDF Upload Error:",

                error

              );


              return res.status(500).json({

                message:
                  "PDF upload failed",

                error:
                  error.message,

              });

            }


            return res.status(200).json({

              message:
                "PDF uploaded successfully",


              pdfUrl:
                result.secure_url,


              pdfPublicId:
                result.public_id,

            });

          }

        );


      uploadStream.end(

        req.file.buffer

      );


    } catch (error) {

      console.error(

        "PDF Upload Error:",

        error

      );


      return res.status(500).json({

        message:
          "PDF upload failed",

        error:
          error.message,

      });

    }

  }

);


// =====================================
// EXPORT ROUTER
// =====================================

module.exports = router;