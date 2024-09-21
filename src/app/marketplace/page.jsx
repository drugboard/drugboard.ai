"use client";
import Filters from "./components/Filters";
import MarketPlaceHeader from "./components/MarketPlaceHeader";
import ProductsListing from "./components/ProductsListing";
import PromotionBanner from "./components/PromotionBanner";

const Marketplace = () => {
  return (
    <div>
      <MarketPlaceHeader />
      <main>
        <Filters />
        <PromotionBanner />
        <ProductsListing />
      </main>
    </div>
  )
};

export default Marketplace;
