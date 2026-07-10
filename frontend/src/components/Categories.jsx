import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import Title from "./Title";
import FeaturedCategoryCard from "./FeaturedCategoryCard";

const CategorySkeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse overflow-hidden rounded-xl bg-gray-200 ${className}`}
  >
    <div className="h-full w-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
  </div>
);

const featuredLayout = [
  {
    className: "col-span-2 row-span-2",
    titleClassName: "text-3xl",
  },
  {
    className: "col-span-1 row-span-1",
    titleClassName: "text-xl",
  },
  {
    className: "col-span-1 row-span-2",
    titleClassName: "text-2xl",
  },
  {
    className: "col-span-1 row-span-2",
    titleClassName: "text-2xl",
  },
  {
    className: "col-span-2 row-span-1",
    titleClassName: "text-lg",
  },
  {
    className: "col-span-1 row-span-1",
    titleClassName: "text-lg",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          apiClient.get("/api/meta/categories"),
          apiClient.get("/api/meta/sub-categories"),
        ]);

        const mainCategories = categoriesResponse.data.categories || [];
        const subCategories = subCategoriesResponse.data.subCategories || [];

        setCategories([
          ...mainCategories.map((item) => ({
            ...item,
            type: "category",
          })),
          ...subCategories.map((item) => ({
            ...item,
            type: "subcategory",
          })),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (item) => {
    if (!item) return;

    if (item.type === "category") {
      navigate(`/collection?category=${encodeURIComponent(item.name)}`);
    } else {
      navigate(`/collection?subcategory=${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <section className="my-14">
      <div className="py-8 text-center text-3xl sm:text-4xl">
        <Title text1="SHOP BY" text2="CATEGORY" />

        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Find your style from our latest clothing collections.
        </p>
      </div>

      {loading ? (
        <div className="grid auto-rows-[150px] grid-cols-4 gap-4">
          {featuredLayout.map((layout, index) => (
            <CategorySkeleton
              key={index}
              className={layout.className}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Featured Categories */}
          <div className="grid grid-cols-4 auto-rows-[170px] gap-4 grid-flow-dense">
            {featuredLayout.map((layout, index) => (
              <FeaturedCategoryCard
                key={index}
                item={categories[index]}
                onClick={() => handleCategoryClick(categories[index])}
                {...layout}
              />
            ))}
          </div>

          {/* Remaining Categories */}
          {categories.length > 6 && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {categories.slice(6).map((item) => (
                <FeaturedCategoryCard
                  key={`${item.type}-${item.name}`}
                  item={item}
                  onClick={() => handleCategoryClick(item)}
                  className="aspect-square"
                  titleClassName="text-lg"
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Categories;