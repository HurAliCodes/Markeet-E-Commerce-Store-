import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true,},
    description: { type: String, required: true,},
    image: { type: Array, required: true,},
    price: { type: Number, required: true,},
    category: { type: String, required: true,},
    subCategory: { type: String, required: true,},
    sizes: { type: Array, required: true,},
    bestSeller: { type: Boolean, default: false,},
    date: { type: Date, default: Date.now,},
  },{
    timestamps: true,
  }
);

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;