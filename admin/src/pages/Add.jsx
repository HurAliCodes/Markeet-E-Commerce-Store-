import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import {
  productCategories,
  productSizes,
} from "../constants/productData";

const firstCategory = Object.keys(productCategories)[0];

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: firstCategory,
    subCategory: productCategories[firstCategory][0],
    bestseller: false,
  });

  const [sizes, setSizes] = useState([]);

  const handleImage = (index, file) => {
    const temp = [...images];
    temp[index] = file;
    setImages(temp);
  };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((item) => item !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", product.bestseller);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const res = await apiClient.post("/api/product/add", formData);

      if (res.data.success) {
        toast.success(res.data.message);

        setProduct({
          name: "",
          description: "",
          price: "",
          category: firstCategory,
          subCategory: productCategories[firstCategory][0],
          bestseller: false,
        });

        setSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-full rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <div>
            <label className="mb-3 block font-medium">
              Product Images
            </label>

            <div className="flex flex-wrap items-center gap-6">
              {images.map((image, index) => (
                <label
                  key={index}
                  className="sm:w-[8vw] w-full min-w-20 max-w-40 flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-shop_light_green"
                >
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImage(index, e.target.files[0])
                    }
                  />

                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      className="h-full w-full rounded-xl object-cover"
                      alt=""
                    />
                  ) : (
                    <Upload className="text-gray-400" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Name & Price */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block font-medium">Product Name</label>

              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-shop_light_green"
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block font-medium">Price</label>

              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-shop_light_green"
                placeholder="100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-shop_light_green"
              placeholder="Write product description..."
            />
          </div>

          {/* Category */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block font-medium">
                Category
              </label>

              <select
                value={product.category}
                onChange={(e) => {
                  const category = e.target.value;

                  setProduct({
                    ...product,
                    category,
                    subCategory:
                      productCategories[category][0],
                  });
                }}
                className="cursor-pointer mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-shop_light_green"
              >
                {Object.keys(productCategories).map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block font-medium">
                Sub Category
              </label>

              <select
                value={product.subCategory}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    subCategory: e.target.value,
                  })
                }
                className="cursor-pointer mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-shop_light_green"
              >
                {productCategories[product.category].map(
                  (sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block font-medium mb-3">
              Sizes
            </label>

            <div className="flex flex-wrap gap-3">
              {productSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`rounded border-2 border-gray-300 px-5 py-2 transition ${
                    sizes.includes(size)
                      ? "border-shop_light_green bg-shop_light_green text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
            <span className="text-gray-700 text-xl">Add To Bestseller</span>
            <input
              type="checkbox"
              checked={product.bestseller}
              onChange={(e) =>
                setProduct({
                  ...product,
                  bestseller: e.target.checked,
                })
              }
              className='customCheckBox cursor-pointer top-0.5 relative'
            />
          </div>

          <button
            className="rounded-xl bg-shop_light_green px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;