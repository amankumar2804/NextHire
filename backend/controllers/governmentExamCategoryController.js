const GovernmentExamCategory = require(
  "../models/governmentExamCategoryModel"
);


// ===============================
// CREATE CATEGORY
// ===============================

const createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      imagePublicId,
    } = req.body;


    if (!name || !slug || !description) {
      return res.status(400).json({
        message:
          "Name, slug and description are required",
      });
    }


    const existingCategory =
      await GovernmentExamCategory.findOne({
        slug,
      });


    if (existingCategory) {
      return res.status(400).json({
        message:
          "Category with this slug already exists",
      });
    }


    const category =
      await GovernmentExamCategory.create({
        name,
        slug,
        description,
        image,
        imagePublicId,
      });


    res.status(201).json({
      message:
        "Government exam category created successfully",

      category,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to create category",

      error:
        error.message,
    });

  }
};


// ===============================
// GET ALL CATEGORIES
// ===============================

const getCategories = async (req, res) => {
  try {

    const categories =
      await GovernmentExamCategory
        .find()
        .sort({
          createdAt: -1,
        });


    res.status(200).json({
      categories,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch categories",

      error:
        error.message,
    });

  }
};


// ===============================
// GET SINGLE CATEGORY
// ===============================

const getCategoryById = async (req, res) => {
  try {

    const category =
      await GovernmentExamCategory.findById(
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

    res.status(500).json({
      message:
        "Failed to fetch category",

      error:
        error.message,
    });

  }
};


// ===============================
// UPDATE CATEGORY
// ===============================

const updateCategory = async (req, res) => {
  try {

    const {
      name,
      slug,
      description,
      image,
      imagePublicId,
      isActive,
    } = req.body;


    const category =
      await GovernmentExamCategory.findById(
        req.params.id
      );


    if (!category) {
      return res.status(404).json({
        message:
          "Category not found",
      });
    }


    category.name =
      name ?? category.name;

    category.slug =
      slug ?? category.slug;

    category.description =
      description ?? category.description;

    category.image =
      image ?? category.image;

    category.imagePublicId =
      imagePublicId ?? category.imagePublicId;

    category.isActive =
      isActive ?? category.isActive;


    const updatedCategory =
      await category.save();


    res.status(200).json({
      message:
        "Category updated successfully",

      category:
        updatedCategory,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to update category",

      error:
        error.message,
    });

  }
};


// ===============================
// DELETE CATEGORY
// ===============================

const deleteCategory = async (req, res) => {
  try {

    const category =
      await GovernmentExamCategory.findById(
        req.params.id
      );


    if (!category) {
      return res.status(404).json({
        message:
          "Category not found",
      });
    }


    await category.deleteOne();


    res.status(200).json({
      message:
        "Category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to delete category",

      error:
        error.message,
    });

  }
};


module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};