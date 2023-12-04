import React, { useState } from "react";
import classes from "./modalBox.module.scss";
import Image from "next/image";
const ModalBox = ({ closeModal }: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.closeButtonContainer}>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0L8L8njUWshrMz0DlBEEn1-CoRmguVDJjQ&usqp=CAU"
          alt=""
          height={20}
          width={20}
          onClick={closeModal}
          className={classes.closeIcon}
        />
      </div>
      <div className={classes.modalContent}>
        <button className={classes.buttonContainer}>Terminate</button>
        <button className={classes.buttonContainer}>Connect</button>
      </div>
    </div>
  );
};

export default ModalBox;
