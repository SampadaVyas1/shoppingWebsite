import EachProductDetails from "@/components/eachProductDetails";
import FooterComponent from "@/components/footerComponent";
import Header from "@/components/header";
import TopHeader from "@/components/topHeader";
import { useRouter } from "next/router";
import React from "react";

const ProductDetails = (props: any) => {
    const router = useRouter();
    const { item } = router.query;
    console.log(item);
  return (
    <div>
      <TopHeader />
      <Header />
      <EachProductDetails productDetails={item} />
      <FooterComponent />
    </div>
  );
};

export default ProductDetails;
