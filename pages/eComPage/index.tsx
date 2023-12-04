import FooterComponent from "@/components/footerComponent";
import Header from "@/components/header";
import ImageSlider from "@/components/imageSlider";
import MainComponent from "@/components/mainComponent";
import ProductsSection from "@/components/productsSection";
import SubHeader from "@/components/subHeader";
import TopHeader from "@/components/topHeader";
import { addCart, removetocart } from "@/reduxSaga/actions/actions";
import Footer from "rc-table/lib/Footer";
import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./ecomPage.module.scss";

const EcomPage = () => {
  const dispatch = useDispatch();
  const notify = () => {
    <div style={{ color: "red", fontSize: "2rem" }}>
      {/* {toast.info("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })} */}
      {toast.warn("🚀 Lorem ipsum dolor", {
        theme: "dark",
      })}
    </div>;
  };
  return (
    <div>
      <TopHeader />
      <Header />
      <SubHeader />
      <button onClick={notify}>Notify!</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={classes.toast}
      />
      <ImageSlider />
      <MainComponent />
      <FooterComponent />
    </div>
  );
};

export default EcomPage;
