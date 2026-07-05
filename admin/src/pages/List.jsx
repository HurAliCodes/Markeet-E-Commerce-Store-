import { useEffect, useState } from "react";
import { Trash2, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";

const List = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await apiClient.get("/api/product/list");

      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await apiClient.delete(`/api/product/remove/${id}`);

      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="rounded-2xl border border-gray-200 bg-white shadow">

        <div className=" p-6">
          <p className="mt-1 text-gray-500">
            Products: {products.length}
          </p>
        </div>

        {/* Desktop */}

        <div className="hidden md:block">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 border-t border-gray-300 text-sm font-medium text-gray-500">

                <th className="px-6 py-4 text-left">
                  Image
                </th>

                <th className="px-6 py-4 text-left">
                  Product
                </th>

                <th className="px-6 py-4 text-left">
                  Category
                </th>

                <th className="px-6 py-4 text-left">
                  Sub Category
                </th>

                <th className="px-6 py-4 text-left">
                  Price
                </th>

                <th className="px-6 py-4 text-center">
                  Bestseller
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">

                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.category}
                  </td>

                  <td className="px-6 py-4">
                    {item.subCategory}
                  </td>

                  <td className="px-6 py-4">
                    ${item.price}
                  </td>

                  <td className="px-6 py-4 pt-8 text-center flex items-center justify-center">

                    {item.bestSeller ? (
                      <Check color="green" className="h-7 w-7"/>
                    ) : (
                      <X color="red" className="h-7 w-7" />
                    )}

                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile */}

        <div className="space-y-4 p-4 md:hidden">

          {products.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border p-4"
            >
              <div className="flex gap-4">

                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-34 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 font-semibold">
                    {item.category}.
                    <span className="ml-1 font-normal">{item.subCategory}</span>
                  </p>

                  <p className="mt-2 font-semibold">
                    ${item.price}
                  </p>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default List;