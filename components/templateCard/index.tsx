import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/enums";
import Container from "../container";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import styles from "./templateCard.module.scss";
import TemplateImage from "../../public/assets/images/templateFirst.svg";
import Button from "../button";
import TipContainer from "../tipContainer";

const TemplateCard = () => {
  return (
    <Container customClass={styles.templateWrapper}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}
        customStyle={styles.templateTitle}
      >
        First conversation message
      </Typography>
      <TipContainer position={TOOLTIP_POSITION.RIGHT}>
        <div className={styles.templateContent}>
          <ImageComponent
            src={TemplateImage}
            customClass={styles.templateImage}
          />
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          >{`Hi [{first name}], \n
I'm a recruiter from Coditas, reaching out to you regarding an exciting opportunity with us! We’re a Pune-based digital engineering company and a certified Great Place to Work that provides business solutions through UX Design and software development. You seem like a great fit for the position based on your profile. If you’re looking for a job change, I'd love to discuss the details and see if they align with your career aspirations.
`}</Typography>
        </div>
      </TipContainer>
      <Button customStyle={styles.templateButton}>{`I am interested`}</Button>
      <Button customStyle={styles.templateButton}>Know More</Button>
    </Container>
  );
};
export default TemplateCard;
