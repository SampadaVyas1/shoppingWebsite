import { useState } from "react";
import AddForm from "@/components/addForm";
import Button from "@/components/button";
import Container from "@/components/container";
import Modal from "@/components/modal";
import styles from "./candidates.module.scss";
import { BUTTON_VARIANT } from "@/common/enums";

const Candidates = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Container customClass={styles.candidatesPage}>
      <Button variant={BUTTON_VARIANT.CONTAINED} onClick={toggleModal}>
        Add Candidate
      </Button>
      {isModalOpen && (
        <Modal header="Add Candidate" onClose={toggleModal}>
          <AddForm />
        </Modal>
      )}
    </Container>
  );
};
export default Candidates;
