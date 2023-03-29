import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import styles from "../styles/app.module.scss";
import Typography from "@/components/typography";
import AddForm from "@/components/addForm";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import DragDropArea from "@/components/dragDropArea";
import Modal from "@/components/modal";

const Home = () => {
  const context = useContext(AuthContext);

  return (
    <div className={styles.components}>
      <Typography variant={TYPOGRAPHY_VARIANT.HEADER_MEDIUM_SEMIBOLD}>
        Welcome!!
      </Typography>
      <Modal header="Add Candidate">
        <AddForm />
      </Modal>
    </div>
  );
};
export default Home;
