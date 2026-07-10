import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Categories from "../components/Categories";
import BrandMarquee from "../components/BrandMarquee";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <LatestCollection />
      <BrandMarquee />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </>
  );
};

export default Home;