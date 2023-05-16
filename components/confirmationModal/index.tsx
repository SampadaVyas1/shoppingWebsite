import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import Button from "../button";
import Container from "../container";
import Modal from "../modal";
import Typography from "../typography";
import styles from "./confirmationModal.module.scss";
import { IConfirmationModalProps } from "./confirmationModal.types";

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

  const renderTypography = (
    text: string | JSX.Element,
    className: string,
    variant: TYPOGRAPHY_VARIANT
  ) => (
    <Typography variant={variant} customStyle={className}>
      {text}
    </Typography>
  );

  const renderButton = (
    text: string,
    onClick?: () => void,
    variant?: BUTTON_VARIANT
  ) => (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  );

  return (
    <Modal onClose={onCancelButtonClick} open={open}>
      <Container customClass={styles.confirmationModal}>
        {renderTypography(
          title,
          styles.title,
          TYPOGRAPHY_VARIANT.TEXT_LARGE_MEDIUM
        )}
        {renderTypography(
          description,
          styles.description,
          TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR
        )}

        <div className={styles.modalButtons}>
          {renderButton(
            cancelButtonText,
            onCancelButtonClick,
            BUTTON_VARIANT.OUTLINED
          )}
          {renderButton(
            confirmButtonText,
            onConfirmButtonClick,
            BUTTON_VARIANT.CONTAINED
          )}
        </div>
      </Container>
    </Modal>
  );
};
export default ConfirmationModal;
