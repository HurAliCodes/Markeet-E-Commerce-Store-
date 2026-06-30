import cloudinary from "cloudinary";
import productModel from "../models/productModel.js";

const addProductService = async (body, files) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    sizes,
    bestseller,
  } = body;

  const image1 = files.image1?.[0];
  const image2 = files.image2?.[0];
  const image3 = files.image3?.[0];
  const image4 = files.image4?.[0];

  const images = [image1, image2, image3, image4].filter(Boolean);

  const imagesUrl = await Promise.all(
    images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path);
      return result.secure_url;
    })
  );

  const product = await productModel.create({
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
    bestseller: bestseller === "true",
    images: imagesUrl,
    date: Date.now(),
  });

  return product;
};

const listProductsService = async () => {
  return await productModel.find({});
};

const removeProductService = async (productId) => {
  return await productModel.findByIdAndDelete(productId);
};

const singleProductService = async (productId) => {
  return await productModel.findById(productId);
};

export {
  addProductService,
  listProductsService,
  removeProductService,
  singleProductService,
};