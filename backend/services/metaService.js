import productModel from "../models/productModel.js";

const getAllCategories = async () => {
  const categories = await productModel.aggregate([
    {
      $match: {
        category: { $exists: true, $ne: "" },
        images: { $exists: true, $ne: [] },
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $group: {
        _id: "$category",
        images: { $first: "$images" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        images: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);
  
  return categories;
};

const getAllSubCategories = async () => {
  const subCategories = await productModel.aggregate([
    {
      $match: {
        subCategory: { $exists: true, $ne: "" },
        images: { $exists: true, $ne: [] },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: "$subCategory",
        images: { $first: "$images" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        images: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);

  return subCategories;
};

const getSubCategoriesByCategory = async (category) => {
  const subCategories = await productModel.aggregate([
    {
      $match: {
        category,
        subCategory: { $exists: true, $ne: "" },
        images: { $exists: true, $ne: [] },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: "$subCategory",
        images: { $first: "$images" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        images: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);

  return subCategories;
};

export {
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesByCategory,
};

