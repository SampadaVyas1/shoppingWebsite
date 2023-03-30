import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Button from "../button";
import Container from "../container";
import Modal from "../modal";
import Typography from "../typography";
import styles from "./confirmationModal.module.scss";

interface IConfirmationModalProps {
  title: JSX.Element | string;
  description: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancelButtonClick?: () => void;
  onConfirmButtonClick?: () => void;
  open?: string;
}

const ConfirmationModal = (props: IConfirmationModalProps) => {
  const {
    open = false,
    title,
    description,
    cancelButtonText = "Cancel",
    confirmButtonText = "Save",
    onCancelButtonClick,
    onConfirmButtonClick,
  } = props;
  return (
    <Modal onClose={onCancelButtonClick}>
      <Container customClass={styles.confirmationModal}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM}
          customStyle={styles.title}
        >
          {title}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}
          customStyle={styles.description}
        >
          {description}
        </Typography>
        <div className={styles.modalButtons}>
          <Button
            variant={BUTTON_VARIANT.OUTLINED}
            onClick={onCancelButtonClick}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant={BUTTON_VARIANT.CONTAINED}
            onClick={onConfirmButtonClick}
          >
            {confirmButtonText}
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
export default ConfirmationModal;
