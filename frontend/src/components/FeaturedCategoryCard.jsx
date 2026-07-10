const FeaturedCategoryCard = ({
  item,
  onClick,
  className = "",
  titleClassName = "",
  contentClassName = "",
  overlayClassName = "",
}) => {
  if (!item) return null;

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl ${className}`}
    >
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-white/70 group-hover:via-white/20 transition duration-300 ${overlayClassName}`}
      />

      <div className={`absolute bottom-4 left-4 flex flex-col justify-start text-left ${contentClassName}`}>
        <h3 className={`font-semibold text-white group-hover:text-shop_dark_green transition duration-300 ${titleClassName}`}>
          {item.name}
        </h3>

        <span className="mt-1 inline-block text-xs font-bold text-shop_light_green transition duration-300 relative transform group-hover:translate-x-0 -translate-x-100">
          Shop now →
        </span>
      </div>
    </button>
  );
};

export default FeaturedCategoryCard;