import React from "react";
import Container from "../container";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import Button from "../button";
import TipContainer from "../tipContainer";
import styles from "./templateCard.module.scss";
import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/enums";
import { ITemplateCardProps } from "./templateCard.types";
import { formatTemplateName } from "@/common/utils";

const TemplateCard = (props: ITemplateCardProps) => {
  const { header, description, imageUrl, templateName, hasActions } = props;
  return (
    <Container customClass={styles.templateWrapper}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD}
        customStyle={styles.templateTitle}
      >
        {formatTemplateName(templateName!)}
      </Typography>
      <TipContainer position={TOOLTIP_POSITION.RIGHT}>
        <div className={styles.templateContent}>
          {imageUrl && (
            <ImageComponent src={imageUrl} customClass={styles.templateImage} />
          )}
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}>
            {header}
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}>
            {description}
          </Typography>
        </div>
      </TipContainer>
      {hasActions && (
        <React.Fragment>
          <Button
            customStyle={styles.templateButton}
          >{`I am interested`}</Button>
          <Button customStyle={styles.templateButton}>Know More</Button>
        </React.Fragment>
      )}
    </Container>
  );
};
export default TemplateCard;
