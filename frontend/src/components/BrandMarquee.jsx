const brands = [
  "NIKE",
  "ADIDAS",
  "PUMA",
  "LEVI'S",
  "ZARA",
  "H&M",
  "GUCCI",
  "VERSACE",
];

const BrandList = () => {
  return (
    <div className="flex min-w-screen items-center justify-between gap-10 pr-10 sm:gap-16 sm:pr-16">
      {brands.map((brand) => (
        <div
          key={brand}
          className="flex min-w-[120px] items-center justify-center"
        >
          <p className="whitespace-nowrap text-lg font-bold tracking-[0.2em] text-white opacity-90 transition hover:text-shop_light_green sm:text-xl">
            {brand}
          </p>
        </div>
      ))}
    </div>
  );
};

const BrandMarquee = () => {
  return (
    <section className="mt-10 absolute left-0 w-[100vw] overflow-hidden border-y border-shop_light_green/30 bg-shop_dark_green/90 py-3">
      <div className="brand-marquee-track flex w-full">
        <BrandList />
        <BrandList />
      </div>
    </section>
  );
};

export default BrandMarquee;
