import {
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesByCategory,
} from "../services/metaService.js";

const allCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

const allSubCategories = async (req, res) => {
  try {
    const subCategories = await getAllSubCategories();
    
    return res.status(200).json({
      success: true,
      message: "Sub-categories fetched successfully",
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching sub-categories",
      error: error.message,
    });
  }
};


const subCategoriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const subCategories = await getSubCategoriesByCategory(category);

    return res.status(200).json({
      success: true,
      message: "Sub-categories fetched successfully",
      category,
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching sub-categories",
      error: error.message,
    });
  }
};

export {
  allCategories,
  allSubCategories,
  subCategoriesByCategory,
};

