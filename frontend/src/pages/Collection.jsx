import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ChevronDown } from "lucide-react";

const Collection = () => {
  const {
    products,
    categories,
    subcategories,
    sortTypes,
    search,
    setSearch,
    showSearch,
    currency
  } = useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const [sizes, setSizes] = useState([]);
  
  const absoluteMinPrice = 0;
  const absoluteMaxPrice = 1000;

  const [minPrice, setMinPrice] = useState(absoluteMinPrice);
  const [maxPrice, setMaxPrice] = useState(absoluteMaxPrice);

  useEffect(() => {
    const selectedCategory = searchParams.get("category");
    const selectedSubcategory = searchParams.get("subcategory");

    setCategory(selectedCategory ? [selectedCategory] : []);
    setSubcategory(selectedSubcategory ? [selectedSubcategory] : []);
  }, [searchParams]);

  const sortProducts = (sortBy) => {
    let sorted = [...filterProducts];

    switch (sortBy) {
      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }

    setFilterProducts(sorted);
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subcategory.length > 0) {
      filtered = filtered.filter((product) =>
        subcategory.includes(product.subCategory)
      );
    }

    if (sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size))
      );
    }

    filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    setFilterProducts(filtered);
  };

  const toggleCategory = (cat) => {
    if (category.includes(cat)) {
      setCategory((prev) => prev.filter((item) => item !== cat));
    } else {
      setCategory((prev) => [...prev, cat]);
    }
  };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  const toggleSubcategory = (subcat) => {
    if (subcategory.includes(subcat)) {
      setSubcategory((prev) => prev.filter((item) => item !== subcat));
    } else {
      setSubcategory((prev) => [...prev, subcat]);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [
    products,
    category,
    subcategory,
    sizes,
    search,
    showSearch,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
      <div className="mb-10 min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 flex cursor-pointer items-center gap-2 text-xl"
        >
          FILTERS
          <ChevronDown
            className={`h-5 sm:hidden ${showFilter ? "" : "-rotate-90"}`}
          />
        </p>

        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Category</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((item) => (
              <label
                key={item}
                className="flex w-fit cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={category.includes(item)}
                  className="customCheckBox h-4 w-4 cursor-pointer"
                  onChange={() => toggleCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Subcategory</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subcategories.map((item) => (
              <label
                key={item}
                className="flex w-fit cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={subcategory.includes(item)}
                  className="customCheckBox h-4 w-4 cursor-pointer"
                  onChange={() => toggleSubcategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-6 border border-gray-300 py-4 pl-5 pr-5">
          <p className="mb-4 text-sm font-medium uppercase text-shop_dark_green">
            Price Range
          </p>

          <div className="mb-2 flex items-center justify-between text-xs font-medium text-shop_dark_green">
            <span>{currency}{minPrice}</span>
            <span>{currency}{maxPrice}</span>
          </div>

          <div className="relative h-6">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />

            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-shop_light_green"
              style={{
                left: `${(minPrice / absoluteMaxPrice) * 100}%`,
                right: `${100 - (maxPrice / absoluteMaxPrice) * 100}%`,
                maxWidth: `calc(100%  )`,
              }}
            />

            <input
              type="range"
              min={absoluteMinPrice}
              max={absoluteMaxPrice}
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPrice(Math.min(value, maxPrice - 1));
              }}
              className="price-range absolute top-0 h-6 w-full appearance-none bg-transparent"
            />

            <input
              type="range"
              min={absoluteMinPrice}
              max={absoluteMaxPrice}
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(Math.max(value, minPrice + 1));
              }}
              className="price-range absolute top-0 h-6 w-full appearance-none bg-transparent"
            />
          </div>

          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
            <span>{currency}{absoluteMinPrice}</span>
            <span>{currency}{absoluteMaxPrice}</span>
          </div>
        </div>

        <div className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Size</p>

          <div className="flex flex-wrap gap-1">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-7  rounded border px-1 py-1 text-sm transition ${
                  sizes.includes(size)
                    ? "border-shop_light_green bg-shop_light_green text-white"
                    : "border-gray-300 text-gray-700 hover:border-shop_light_green hover:text-shop_dark_green"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>



      </div>

      <div className="flex-1">
        <div className="mb-4 flex justify-between text-base sm:text-2xl">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            className="cursor-pointer border-2 border-gray-300 px-2 text-sm"
            onChange={(e) => sortProducts(e.target.value)}
          >
            <option value="relevant">Sort by Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

