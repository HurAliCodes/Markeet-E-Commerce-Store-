import {
  addProductService,
  listProductsService,
  removeProductService,
  singleProductService,
} from "../services/productService.js";

const addProduct = async (req, res) => {
  try {
    await addProductService(req.body, req.files);

    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await listProductsService();

    res.status(200).json({
      success: true,
      message: "Products listed successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    await removeProductService(productId);

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await singleProductService(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};