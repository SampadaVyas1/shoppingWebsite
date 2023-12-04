import React from "react";
import classes from "./footer.module.scss";
const FooterComponent = () => {
  const handleBackToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={classes.footer}>
      <div className={classes.footerWrapper}>
        <div>
          Designed and developed{" "}
          <span className={classes.designerName}> Sampada Vyas</span> by ©2023
        </div>

        <img
          src={"https://cer.iitk.ac.in/olt_img/top.png"}
          alt=""
          height={60}
          width={60}
          className={classes.backToTop}
          onClick={handleBackToTop}
        />
      </div>
    </div>
  );
};

export default FooterComponent;
