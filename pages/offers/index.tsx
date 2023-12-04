import FooterComponent from "@/components/footerComponent";
import Header from "@/components/header";
import ShoppingOffer from "@/components/shoppingOffer";
import SubHeader from "@/components/subHeader";
import TopHeader from "@/components/topHeader";
import React from "react";

const Offers = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      <SubHeader />
      <ShoppingOffer />
      <FooterComponent />
    </div>
  );
};

export default Offers;
